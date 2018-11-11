export default [
  `CREATE TABLE supplier(
    supplier_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    company_name VARCHAR2(50) NOT NULL,
    contact_name VARCHAR2(50) NOT NULL,
    address VARCHAR2(50) NOT NULL,
    phone_number VARCHAR2(10) NOT NULL,
    email VARCHAR2(50) NOT NULL,
    payment_method VARCHAR2(50) NOT NULL
  )`,
  `CREATE TABLE client(
    client_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    company_name VARCHAR2(50),
    contact_name VARCHAR2(50) NOT NULL,
    address VARCHAR2(50),
    phone_number VARCHAR2(10) NOT NULL,
    billing_info VARCHAR2(16) NOT NULL,
    email VARCHAR2(50)
  )`,
  `CREATE TABLE rental(
    rental_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    client_id NUMBER REFERENCES client(client_id) NOT NULL
  )`,
  `CREATE TABLE sale(
    sale_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    sale_date DATE NOT NULL,
    client_id NUMBER REFERENCES client(client_id) NOT NULL
  )`,
  `CREATE TABLE purchase_order(
    purchase_order_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    purchase_order_date DATE NOT NULL,
    supplier_id NUMBER REFERENCES supplier(supplier_id) NOT NULL
  )`,
  `CREATE TABLE rental_invoice(
    date_issued DATE NOT NULL,
    date_due DATE NOT NULL,
    total_cost NUMBER NOT NULL,
    amount_received NUMBER DEFAULT 0 NOT NULL,
    is_reconciled CHAR DEFAULT 'N' NOT NULL,
    rental_id NUMBER NOT NULL,
    CONSTRAINT fk_rental_id FOREIGN KEY (rental_id) REFERENCES rental(rental_id)
  ON DELETE CASCADE,
    PRIMARY KEY (rental_id)
  )`,
  `CREATE TABLE sale_invoice(
    date_issued DATE NOT NULL,
    date_due DATE NOT NULL,
    total_cost NUMBER NOT NULL,
    amount_received NUMBER DEFAULT 0 NOT NULL,
    is_reconciled CHAR DEFAULT 'N' NOT NULL,
    sale_id NUMBER,
    CONSTRAINT fk_sale_id FOREIGN KEY (sale_id) REFERENCES sale(sale_id)
  ON DELETE CASCADE,
    PRIMARY KEY (sale_id)
  )`,
  `CREATE TABLE incoming_invoice(
    date_received DATE NOT NULL,
    date_due DATE NOT NULL,
    total_cost NUMBER NOT NULL,
    amount_paid NUMBER DEFAULT 0 NOT NULL,
    is_reconciled CHAR DEFAULT 'N' NOT NULL,
    purchase_order_id NUMBER NOT NULL,
    CONSTRAINT fk_purchase_order FOREIGN KEY (purchase_order_id) REFERENCES
  purchase_order(purchase_order_id) ON DELETE CASCADE,
    PRIMARY KEY (purchase_order_id)
  )`,
  `CREATE TABLE rental_item(
    rental_item_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    model VARCHAR2(50) NOT NULL,
    serial_number NUMBER NOT NULL UNIQUE,
    barcode_number NUMBER NOT NULL UNIQUE,
    daily_price NUMBER NOT NULL,
    current_status VARCHAR2(10) NOT NULL,
    purchase_order_id NUMBER REFERENCES purchase_order(purchase_order_id) NOT NULL
  )`,
  `CREATE TABLE consumable_item(
    consumable_item_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    model VARCHAR2(50) NOT NULL,
    serial_number NUMBER UNIQUE,
    current_stock NUMBER DEFAULT 0 NOT NULL,
    price NUMBER NOT NULL,
    purchase_order_id NUMBER REFERENCES purchase_order(purchase_order_id) NOT NULL
  )`,
  `CREATE TABLE supplies_consumable(
    supplies_consumable_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    supplier_id NUMBER REFERENCES supplier(supplier_id) NOT NULL,
    consumable_item_id NUMBER REFERENCES consumable_item(consumable_item_id) NOT NULL
  )`,
  `CREATE TABLE supplies_rentable(
    supplies_rentable_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    supplier_id NUMBER REFERENCES supplier(supplier_id) NOT NULL,
    rental_item_id NUMBER REFERENCES rental_item(rental_item_id) NOT NULL
  )`,
  `CREATE TABLE sells(
    sells_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    sale_id NUMBER REFERENCES sale(sale_id) NOT NULL,
    consumable_item_id NUMBER REFERENCES consumable_item(consumable_item_id) NOT NULL
  )`,
  `CREATE TABLE contains(
    contains_id NUMBER GENERATED AS IDENTITY PRIMARY KEY,
    rental_id NUMBER REFERENCES rental(rental_id) NOT NULL,
    rental_item_id NUMBER REFERENCES rental_item(rental_item_id) NOT NULL
  )`,
];
