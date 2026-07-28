import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  function createTableOrder(zone, table) {
    const order = {
      id: crypto.randomUUID(),
      type: "table",
      zone,
      table: String(table),
      name: `Tafel ${table}`,
      status: "occupied",
      createdAt: Date.now(),
      items: [],
    };

    setOrders((prev) => [...prev, order]);
    return order;
  }

  function createCustomerOrder(zone, customerName = "") {
    const count =
      orders.filter((o) => o.type === "customer").length + 1;

    const order = {
      id: crypto.randomUUID(),
      type: "customer",
      zone,
      table: null,
      name: customerName.trim() || `Klant ${count}`,
      status: "occupied",
      createdAt: Date.now(),
      items: [],
    };

    setOrders((prev) => [...prev, order]);
    return order;
  }

  function getOrder(orderId) {
    return orders.find((o) => o.id === orderId);
  }

  function isTableOccupied(zone, table) {
    return orders.some(
      (o) =>
        o.type === "table" &&
        o.zone === zone &&
        String(o.table) === String(table)
    );
  }

  function addItem(orderId, product) {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const existing = order.items.find(
          (item) => item.id === product.id
        );

        if (existing) {
          return {
            ...order,
            items: order.items.map((item) =>
              item.id === product.id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                  }
                : item
            ),
          };
        }

        return {
          ...order,
          items: [
            ...order.items,
            {
              ...product,
              quantity: 1,
            },
          ],
        };
      })
    );
  }
    function increaseItem(orderId, productId) {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        return {
          ...order,
          items: order.items.map((item) =>
            item.id === productId
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          ),
        };
      })
    );
  }

  function decreaseItem(orderId, productId) {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        return {
          ...order,
          items: order.items
            .map((item) =>
              item.id === productId
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                  }
                : item
            )
            .filter((item) => item.quantity > 0),
        };
      })
    );
  }

  function clearOrder(orderId) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              items: [],
            }
          : order
      )
    );
  }

  function deleteOrder(orderId) {
    setOrders((prev) =>
      prev.filter((order) => order.id !== orderId)
    );
  }

  function updateOrder(orderId, updater) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? updater(order)
          : order
      )
    );
  }
    function saveOrder() {
    // Voor later (database/Firebase)
    return true;
  }

function moveOrder(orderId, newTable) {
  setOrders((prev) => {
    const order = prev.find((o) => o.id === orderId);

    if (!order) return prev;

    const occupied = prev.some(
      (o) =>
        o.id !== orderId &&
        o.type === "table" &&
        o.zone === order.zone &&
        String(o.table) === String(newTable)
    );

    if (occupied) {
      alert("Deze tafel is al bezet.");
      return prev;
    }

    return prev.map((o) =>
      o.id === orderId
        ? {
            ...o,
            type: "table",
            table: String(newTable),
            name: `Tafel ${newTable}`,
          }
        : o
    );
  });
}

  function mergeOrders(sourceOrderId, targetOrderId) {
    if (
      !sourceOrderId ||
      !targetOrderId ||
      sourceOrderId === targetOrderId
    ) {
      return;
    }

    setOrders((prev) => {
      const source = prev.find((o) => o.id === sourceOrderId);
      const target = prev.find((o) => o.id === targetOrderId);

      if (!source || !target) return prev;

      const mergedItems = [...target.items];

      source.items.forEach((item) => {
        const existing = mergedItems.find(
          (i) => i.id === item.id
        );

        if (existing) {
          existing.quantity += item.quantity;
        } else {
          mergedItems.push({ ...item });
        }
      });

      return prev
        .map((order) =>
          order.id === targetOrderId
            ? {
                ...order,
                items: mergedItems,
              }
            : order
        )
        .filter((order) => order.id !== sourceOrderId);
    });
  }
  function completeOrder(orderId) {
  setOrders((prev) =>
    prev.filter((order) => order.id !== orderId)
  );
}
    return (
    <OrderContext.Provider
      value={{
        orders,
        setOrders,

        createTableOrder,
        createCustomerOrder,

        getOrder,
        isTableOccupied,

        addItem,
        increaseItem,
        decreaseItem,

        clearOrder,
        deleteOrder,
        completeOrder,
        updateOrder,

        saveOrder,
        moveOrder,
        mergeOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}