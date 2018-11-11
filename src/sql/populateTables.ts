export default [
  `INSERT INTO client(company_name, contact_name, address, phone_number, billing_info, email)
  VALUES('Integra', 'Johnny Rotten', '123 Main St', '4167850875', '1234567890123', 'johnny@integra.ca')`,
  `INSERT INTO client(company_name, contact_name, address, phone_number, billing_info, email)
  VALUES('L and P Solutions', 'Dolly Parton', '7 West Ave', '4164601530', '9876543210987', 'dparton@solutions.com')`,
  `INSERT INTO supplier(company_name, contact_name, address, phone_number, payment_method, email)
  VALUES('Nikon', 'Stevie Vaughan', '14 Parkland Road', '4379887685', '3958392757191', 'srvaughn@nikon.ca')`,
  `INSERT INTO supplier(company_name, contact_name, address, phone_number, payment_method, email)
  VALUES('Bose', 'Jimi Hendrix', '656 Drury Lane', '6478999998', '2495832756875', 'jimihendrix@bose.com')`,
  `INSERT INTO rental(start_date, end_date, client_id)
  VALUES(TO_DATE('2018/05/03', 'yyyy/mm/dd'),
    TO_DATE('2018/05/10', 'yyyy/mm/dd'),
    (SELECT client_id FROM client WHERE company_name = 'Integra'))`,
  `INSERT INTO rental(start_date, end_date, client_id)
  VALUES(TO_DATE('2018/07/04', 'yyyy/mm/dd'),
    TO_DATE('2018/08/17', 'yyyy/mm/dd'),
    (SELECT client_id FROM client WHERE company_name = 'Integra'))`,
  `INSERT INTO rental(start_date, end_date, client_id)
  VALUES(TO_DATE('2018/06/19', 'yyyy/mm/dd'),
    TO_DATE('2018/06/21', 'yyyy/mm/dd'),
    (SELECT client_id FROM client WHERE company_name = 'L and P Solutions'))`,
  `INSERT INTO rental(start_date, end_date, client_id)
  VALUES(TO_DATE('2018/9/23', 'yyyy/mm/dd'),
    TO_DATE('2018/12/17', 'yyyy/mm/dd'),
    (SELECT client_id FROM client WHERE company_name = 'L and P Solutions'))`,
  `INSERT INTO sale(sale_date, client_id)
  VALUES(TO_DATE('2018/09/25','yyyy/mm/dd'),
    (SELECT client_id FROM client WHERE company_name = 'Integra'))`,
  `INSERT INTO purchase_order(purchase_order_date, supplier_id)
  VALUES(TO_DATE('2018/04/12', 'yyyy/mm/dd'),
    (SELECT supplier_id FROM supplier WHERE company_name = 'Nikon'))`,
  `INSERT INTO purchase_order(purchase_order_date, supplier_id)
  VALUES(TO_DATE('2018/03/01', 'yyyy/mm/dd'),
    (SELECT supplier_id FROM supplier WHERE company_name = 'Nikon'))`,
  `INSERT INTO purchase_order(purchase_order_date, supplier_id)
  VALUES(TO_DATE('2018/02/03', 'yyyy/mm/dd'),
    (SELECT supplier_id FROM supplier WHERE company_name = 'Bose'))`,
  `INSERT INTO purchase_order(purchase_order_date, supplier_id)
  VALUES(TO_DATE('2018/01/04', 'yyyy/mm/dd'),
    (SELECT supplier_id FROM supplier WHERE company_name = 'Bose'))`,
  `INSERT INTO rental_invoice(date_issued, date_due, total_cost, amount_received, is_reconciled, rental_id)
  VALUES(TO_DATE('2018/05/10', 'yyyy/mm/dd'),
    TO_DATE('2018/06/10', 'yyyy/mm/dd'),
    100,
    100,
    'Y',
    (SELECT rental_id FROM rental WHERE end_date = TO_DATE('2018/05/10', 'yyyy/mm/dd')))`,
  `INSERT INTO rental_invoice(date_issued, date_due, total_cost, amount_received, is_reconciled, rental_id)
  VALUES(TO_DATE('2018/08/17', 'yyyy/mm/dd'),
    TO_DATE('2018/09/17', 'yyyy/mm/dd'),
    750,
    325,
    'N',
    (SELECT rental_id FROM rental WHERE end_date = TO_DATE('2018/08/17', 'yyyy/mm/dd')))`,
  `INSERT INTO rental_invoice(date_issued, date_due, total_cost, amount_received, is_reconciled, rental_id)
  VALUES(TO_DATE('2018/06/21', 'yyyy/mm/dd'),
    TO_DATE('2018/07/19', 'yyyy/mm/dd'),
    5000,
    0,
    'N',
    (SELECT rental_id FROM rental WHERE end_date = TO_DATE('2018/06/21', 'yyyy/mm/dd')))`,
  `INSERT INTO rental_invoice(date_issued, date_due, total_cost, amount_received, is_reconciled, rental_id)
  VALUES(TO_DATE('2018/12/17', 'yyyy/mm/dd'),
    TO_DATE('2019/01/17', 'yyyy/mm/dd'),
    10000,
    2500,
    'N',
    (SELECT rental_id FROM rental WHERE end_date = TO_DATE('2018/12/17', 'yyyy/mm/dd')))`,
  `INSERT INTO sale_invoice(date_issued, date_due, total_cost, amount_received, is_reconciled, sale_id)
  VALUES(TO_DATE('2018/09/25', 'yyyy/mm/dd'),
    TO_DATE('2018/10/25', 'yyyy/mm/dd'),
    55,
    55,
    'Y',
    (SELECT sale_id FROM sale WHERE sale_date = TO_DATE('2018/09/25', 'yyyy/mm/dd')))`,
  `INSERT INTO incoming_invoice(date_received, date_due, total_cost, amount_paid, is_reconciled, purchase_order_id)
  VALUES(TO_DATE('2018/04/12', 'yyyy/mm/dd'),
    TO_DATE('2018/05/12', 'yyyy/mm/dd'),
    2500,
    2500,
    'Y',
    (SELECT purchase_order_id FROM purchase_order WHERE purchase_order_date = TO_DATE('2018/04/12', 'yyyy/mm/dd')))`,
  `INSERT INTO incoming_invoice(date_received, date_due, total_cost, amount_paid, is_reconciled, purchase_order_id)
  VALUES(TO_DATE('2018/03/01', 'yyyy/mm/dd'),
    TO_DATE('2018/04/01', 'yyyy/mm/dd'),
    740,
    740,
    'Y',
    (SELECT purchase_order_id FROM purchase_order WHERE purchase_order_date = TO_DATE('2018/03/01', 'yyyy/mm/dd')))`,
  `INSERT INTO incoming_invoice(date_received, date_due, total_cost, amount_paid, is_reconciled, purchase_order_id)
  VALUES(TO_DATE('2018/02/03', 'yyyy/mm/dd'),
    TO_DATE('2018/03/03', 'yyyy/mm/dd'),
    825,
    450,
    'N',
    (SELECT purchase_order_id FROM purchase_order WHERE purchase_order_date = TO_DATE('2018/02/03', 'yyyy/mm/dd')))`,
  `INSERT INTO incoming_invoice(date_received, date_due, total_cost, amount_paid, is_reconciled, purchase_order_id)
  VALUES(TO_DATE('2018/01/04', 'yyyy/mm/dd'),
    TO_DATE('2018/02/04', 'yyyy/mm/dd'),
    1125,
    1125,
    'Y',
    (SELECT purchase_order_id FROM purchase_order WHERE purchase_order_date = TO_DATE('2018/01/04', 'yyyy/mm/dd')))`,
  `INSERT INTO rental_item(model, serial_number, barcode_number, daily_price, current_status, purchase_order_id)
  VALUES('A700X',
    434562,
    2231412,
    25,
    'AVAILABLE',
    (SELECT purchase_order_id FROM purchase_order WHERE purchase_order_date = TO_DATE('2018/04/12', 'yyyy/mm/dd')))`,
  `INSERT INTO rental_item(model, serial_number, barcode_number, daily_price, current_status, purchase_order_id)
  VALUES('A700X',
    827432,
    2231413,
    25,
    'AVAILABLE',
    (SELECT purchase_order_id FROM purchase_order WHERE purchase_order_date = TO_DATE('2018/04/12', 'yyyy/mm/dd')))`,
  `INSERT INTO rental_item(model, serial_number, barcode_number, daily_price, current_status, purchase_order_id)
  VALUES('E15 Subwoofer',
    81234,
    2235001,
    15,
    'RENTED',
    (SELECT purchase_order_id FROM purchase_order WHERE purchase_order_date = TO_DATE('2018/02/03', 'yyyy/mm/dd')))`,
  `INSERT INTO rental_item(model, serial_number, barcode_number, daily_price, current_status, purchase_order_id)
  VALUES('E15 Subwoofer',
    81563,
    2235002,
    15,
    'RENTED',
    (SELECT purchase_order_id FROM purchase_order WHERE purchase_order_date = TO_DATE('2018/02/03', 'yyyy/mm/dd')))`,
  `INSERT INTO rental_item(model, serial_number, barcode_number, daily_price, current_status, purchase_order_id)
  VALUES('E15 Subwoofer',
    81437,
    2235003,
    15,
    'RENTED',
    (SELECT purchase_order_id FROM purchase_order WHERE purchase_order_date = TO_DATE('2018/02/03', 'yyyy/mm/dd')))`,
  `INSERT INTO consumable_item(model, current_stock, price, purchase_order_id)
  VALUES('AA Batteries - 4 Pack',
    24,
    3.50,
    (SELECT purchase_order_id FROM purchase_order WHERE purchase_order_date = TO_DATE('2018/01/04', 'yyyy/mm/dd')))`,
  `INSERT INTO supplies_consumable(supplier_id, consumable_item_id)
  VALUES((SELECT supplier_id FROM supplier WHERE company_name = 'Nikon'),
  (SELECT consumable_item_id FROM consumable_item WHERE model = 'AA Batteries - 4 Pack'))`,
  `INSERT INTO supplies_rentable(supplier_id, rental_item_id)
  VALUES((SELECT supplier_id FROM supplier WHERE company_name = 'Nikon'),
  (SELECT rental_item_id FROM rental_item WHERE barcode_number = 2231412))`,
  `INSERT INTO supplies_rentable(supplier_id, rental_item_id)
  VALUES((SELECT supplier_id FROM supplier WHERE company_name = 'Nikon'),
  (SELECT rental_item_id FROM rental_item WHERE barcode_number = 2231413))`,
  `INSERT INTO supplies_rentable(supplier_id, rental_item_id)
  VALUES((SELECT supplier_id FROM supplier WHERE company_name = 'Bose'),
  (SELECT rental_item_id FROM rental_item WHERE barcode_number = 2235001))`,
  `INSERT INTO supplies_rentable(supplier_id, rental_item_id)
  VALUES((SELECT supplier_id FROM supplier WHERE company_name = 'Bose'),
  (SELECT rental_item_id FROM rental_item WHERE barcode_number = 2235002))`,
  `INSERT INTO supplies_rentable(supplier_id, rental_item_id)
  VALUES((SELECT supplier_id FROM supplier WHERE company_name = 'Bose'),
  (SELECT rental_item_id FROM rental_item WHERE barcode_number = 2235003))`,
  `INSERT INTO sells(sale_id, consumable_item_id)
  VALUES((SELECT sale_id FROM sale WHERE sale_date = TO_DATE('2018/09/25','yyyy/mm/dd')), 1)`,
  `INSERT INTO contains(rental_id, rental_item_id)
  VALUES((SELECT rental_id FROM rental WHERE start_date = TO_DATE('2018/05/03', 'yyyy/mm/dd')),
  (SELECT rental_item_id FROM rental_item WHERE barcode_number = 2231412))`,
  `INSERT INTO contains(rental_id, rental_item_id)
  VALUES((SELECT rental_id FROM rental WHERE start_date = TO_DATE('2018/05/03', 'yyyy/mm/dd')),
  (SELECT rental_item_id FROM rental_item WHERE barcode_number = 2235001))`,
];
