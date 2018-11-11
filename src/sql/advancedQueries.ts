export default [
  `SELECT start_date, end_date, company_name, contact_name FROM rental, client
    WHERE company_name = 'Integra' AND rental.client_id = client.client_id`,
  `SELECT model, serial_number, current_stock FROM consumable_item i, supplier s, supplies_consumable c
    WHERE i.consumable_item_id = c.consumable_item_id AND c.supplier_id = s.supplier_id AND NOT EXISTS (
    SELECT * FROM supplier WHERE company_name = 'Bose' AND c.supplier_id = supplier.supplier_ID)`,
  `SELECT contact_name, company_name, address FROM client
    WHERE NOT EXISTS (SELECT * FROM rental WHERE client.client_id = rental.client_id)
    OR EXISTS (SELECT * FROM rental WHERE client.client_id = rental.client_id AND EXISTS (
      SELECT * FROM rental_invoice WHERE rental.rental_id = rental_invoice.rental_id AND is_reconciled = 'Y'
    ))`,
  `SELECT model, serial_number FROM rental_item WHERE rental_item_id NOT IN (SELECT rental_item_id FROM contains)`,
  `SELECT model, serial_number, current_stock FROM consumable_item i, purchase_order po, supplier s
    WHERE model LIKE 'AA Batteries%' AND i.purchase_order_id = po.purchase_order_id
    AND s.supplier_id = po.supplier_id AND s.company_name = 'Bose'`,
];
