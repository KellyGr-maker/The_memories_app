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
    console.log("ADD ITEM", orderId, product);
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== orderId) return order;

        const existing = order.items.find(
  (item) =>
    item.id === product.id &&
    item.status === "pending" &&
    item.note === (product.note || "")
);

        if (existing) {
  return {
    ...order,
    items: order.items.map((item) =>
      item.id === product.id &&
item.status === "pending" &&
item.note === (product.note || "")
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
  orderItemId: crypto.randomUUID(),
  ...product,
  note: product.note || "",
  quantity: 1,
  status: "pending",
}
],
        };
      })
    );
  }

  function increaseItem(orderId, orderItemId) {
  setOrders((prev) =>
    prev.map((order) => {
      if (order.id !== orderId) return order;

      return {
        ...order,
        items: order.items.map((item) =>
          item.orderItemId === orderItemId
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

  function decreaseItem(orderId, orderItemId) {
  setOrders((prev) =>
    prev.map((order) => {
      if (order.id !== orderId) return order;

      const index = order.items.findIndex(
        (item) => item.orderItemId === orderItemId
      );

      if (index === -1) return order;

      const items = [...order.items];

      if (items[index].quantity > 1) {
        items[index] = {
          ...items[index],
          quantity: items[index].quantity - 1,
        };
      } else {
        items.splice(index, 1);
      }

      return {
        ...order,
        items,
      };
    })
  );
}

function moveItemToReady(orderId, orderItemId) {
  setOrders((prev) =>
    prev.map((order) => {
      if (order.id !== orderId) return order;

      return {
        ...order,
        items: order.items.map((item) =>
          item.orderItemId === orderItemId
            ? {
                ...item,
                status: "ready",
              }
            : item
        ),
      };
    })
  );
}

function moveItemToServed(orderId, orderItemId) {
  setOrders((prev) =>
    prev.map((order) => {
      if (order.id !== orderId) return order;

      return {
        ...order,
        items: order.items.map((item) =>
          item.orderItemId === orderItemId
            ? {
                ...item,
                status: "served",
              }
            : item
        ),
      };
    })
  );
}
function updateItemNote(orderId, orderItemId, note) {
  setOrders((prev) =>
    prev.map((order) => {
      if (order.id !== orderId) return order;

      return {
        ...order,
        items: order.items.map((item) =>
          item.orderItemId === orderItemId
            ? {
                ...item,
                note,
              }
            : item
        ),
      };
    })
  );
}
    function updateOrder(orderId, updater) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? updater(order) : order
      )
    );
  }

function clearOrder(orderId) {
  setOrders((prev) =>
    prev.flatMap((order) => {
      if (order.id !== orderId) return [order];

      // Losse klant volledig verwijderen
      if (order.type === "customer") {
        return [];
      }

      // Tafel behouden, maar bestelling leegmaken
      return [
        {
          ...order,
          items: [],
        },
      ];
    })
  );
}

  function deleteOrder(orderId) {
    setOrders((prev) =>
      prev.filter((order) => order.id !== orderId)
    );
  }

  function completeOrder(orderId) {
    deleteOrder(orderId);
  }

  function saveOrder() {
    return true;
  }

  function moveOrder(orderId, newTable) {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              type: "table",
              table: String(newTable),
              name: `Tafel ${newTable}`,
            }
          : order
      )
    );
  }

  function mergeOrders(sourceId, targetId) {
    if (!sourceId || !targetId || sourceId === targetId) return;

    setOrders((prev) => {
      const source = prev.find((o) => o.id === sourceId);
      const target = prev.find((o) => o.id === targetId);

      if (!source || !target) return prev;

      const mergedItems = [...target.items];

      source.items.forEach((item) => {
  const existing = mergedItems.find(
    (i) =>
      i.id === item.id &&
      i.status === item.status
  );

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    mergedItems.push({
      ...item,
      orderItemId: crypto.randomUUID(),
    });
  }
});

      return prev
        .map((order) =>
          order.id === targetId
            ? {
                ...order,
                items: mergedItems,
              }
            : order
        )
        .filter((order) => order.id !== sourceId);
    });
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
        moveItemToReady,
        moveItemToServed,
        updateItemNote,
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