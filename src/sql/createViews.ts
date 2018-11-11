export default [
  `CREATE VIEW partially_paid_incoming_invoice AS
    SELECT * FROM incoming_invoice WHERE amount_paid > 0 AND is_reconciled = 'N'`,
  `CREATE VIEW active_rental AS
    SELECT * FROM rental WHERE trunc(sysdate) BETWEEN start_date AND end_date`,
];
