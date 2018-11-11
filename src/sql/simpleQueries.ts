export default [
  `SELECT contact_name, ' works for: ', company_name FROM supplier`,
  `SELECT * FROM client WHERE company_name = 'Integra'`,
  `SELECT * FROM rental WHERE start_date >= TO_DATE('2018-06-19', 'yyyy-mm-dd') ORDER BY start_date ASC`,
  `SELECT * FROM sale`,
  `SELECT supplier_id FROM PURCHASE_ORDER WHERE purchase_order_date <> TO_DATE('2018-03-01', 'yyyy-mm-dd') ORDER BY supplier_id DESC`,
  `SELECT total_cost as cost, is_reconciled FROM rental_invoice WHERE is_reconciled = 'N' ORDER BY cost ASC`,
  `SELECT * FROM sale_invoice WHERE amount_received > 0 and is_reconciled = 'Y'`,
  `SELECT total_cost, amount_paid, is_reconciled FROM incoming_invoice WHERE amount_paid > 0 AND is_reconciled = 'N'`,
  `SELECT model, serial_number FROM rental_item ORDER BY model DESC, serial_number ASC`,
  `SELECT serial_number FROM consumable_item WHERE serial_number IS NOT NULL`,
];
