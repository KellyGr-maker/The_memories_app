import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );
  }, [orders]);

  function getOrder(id) {
    return orders.find((order) => order.id === id);
  }

  function getOrderItems(id) {
    return getOrder(id)?.items || [];
  }

  function isTableOccupied(zone, table) {
    return orders.some(
      (order) =>
        order.zone === zone &&
        order.table === table
    );
  }

  function createTableOrder(zone, table) {
    const id = `${zone}-${table}`;

    const existing = getOrder(id);

    if (existing) return existing;

    const order = {
      id,
      type: "table",
      zone,
      table,
      name: `Tafel ${table}`,
      status: "occupied",
      createdAt: Date.now(),
      items: [],
    };

    setOrders((current) => [
      ...current,
      order,
    ]);

    return order;
  }

  function createCustomerOrder(zone) {
    const order = {
      id: crypto.randomUUID(),
      type: "customer",
      zone,
      table: null,
      name: "Klant",
      status: "occupied",
      createdAt: Date.now(),
      items: [],
    };

    setOrders((current) => [
      ...current,
      order,
    ]);

    return order;
  }

  function saveOrder(id, updatedOrder) {
    setOrders((current) =>
      current.map((order) =>
        order.id === id
          ? updatedOrder
          : order
      )
    );
  }
    function addItem(orderId, product) {
    setOrders((current) =>
      current.map((order) => {
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
              remark: "",
            },
          ],
        };
      })
    );
  }

  function increaseItem(orderId, productId) {
    setOrders((current) =>
      current.map((order) =>
        order.id !== orderId
          ? order
          : {
              ...order,
              items: order.items.map((item) =>
                item.id === productId
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item
              ),
            }
      )
    );
  }

  function decreaseItem(orderId, productId) {
    setOrders((current) =>
      current.map((order) => {
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

  function updateRemark(
    orderId,
    productId,
    remark
  ) {
    setOrders((current) =>
      current.map((order) =>
        order.id !== orderId
          ? order
          : {
              ...order,
              items: order.items.map((item) =>
                item.id === productId
                  ? {
                      ...item,
                      remark,
                    }
                  : item
              ),
            }
      )
    );
  }
    function clearOrder(id) {
    setOrders((current) =>
      current.filter((order) => order.id !== id)
    );
  }

  function moveOrder(id, newTable) {
    setOrders((current) =>
      current.map((order) => {
        if (order.id !== id) return order;

        return {
          ...order,
          id: `${order.zone}-${newTable}`,
          table: newTable,
          name: `Tafel ${newTable}`,
          type: "table",
        };
      })
    );
  }

  function mergeOrders(sourceId, targetId) {
    setOrders((current) => {
      const source = current.find(
        (order) => order.id === sourceId
      );

      const target = current.find(
        (order) => order.id === targetId
      );

      if (!source || !target) return current;

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

      return current
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

  function splitOrder(
    sourceId,
    targetTable,
    selectedItems
  ) {
    setOrders((current) => {
      const source = current.find(
        (order) => order.id === sourceId
      );

      if (!source) return current;

      const newOrder = {
        id: `${source.zone}-${targetTable}`,
        type: "table",
        zone: source.zone,
        table: targetTable,
        name: `Tafel ${targetTable}`,
        status: "occupied",
        createdAt: Date.now(),
        items: selectedItems,
      };

      const remainingItems = source.items.filter(
        (item) =>
          !selectedItems.some(
            (selected) => selected.id === item.id
          )
      );

      return [
        ...current
          .map((order) =>
            order.id === sourceId
              ? {
                  ...order,
                  items: remainingItems,
                }
              : order
          ),
        newOrder,
      ];
    });
  }
    return (
    <OrderContext.Provider
      value={{
        orders,

        getOrder,
        getOrderItems,
        isTableOccupied,

        createTableOrder,
        createCustomerOrder,

        saveOrder,
        clearOrder,

        addItem,
        increaseItem,
        decreaseItem,
        updateRemark,

        moveOrder,
        mergeOrders,
        splitOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);

  if (!context) {
    throw new Error(
      "useOrders must be used within an OrderProvider"
    );
  }

  return context;
}