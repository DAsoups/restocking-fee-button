/** @odoo-module **/

import { patch } from "@web/core/utils/patch";
import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";

function getProduct(pos, name) {
    if (!pos || !pos.db || !pos.db.product_by_id) {
        console.error("POS database not ready");
        return null;
    }

    const products = Object.values(pos.db.product_by_id);
    return products.find(product => product.display_name === name || product.name === name) || null;
}

patch(ControlButtons.prototype, {
    async onClickRestockingFee() {
        console.log("POS Restocking Fee Applied");

        if (!this.pos) {
            console.error("POS instance not available");
            return;
        }

        const order = this.pos.get_order();
        if (!order) {
            console.error("No active order found!");
            return;
        }

        const productLines = order.get_orderlines();
        if (productLines.length === 0) {
            console.warn("No items in order!");
            return;
        }

        const restockingFee = Math.round(order.get_total_without_tax() * 0.15 * 100) / 100;

        const refundFeeProduct = getProduct(this.pos, "Restocking Fee");
        if (!refundFeeProduct) {
            console.error("Restocking Fee product not found in POS database");
            return;
        }

        order.add_product(refundFeeProduct, {
            quantity: 1,
            price: restockingFee,
            discount: 0,
            merge: false,
            tax_ids: [],
            extras: { is_restocking_fee: true }
        });

        console.log(`Restocking Fee successfully added: ${restockingFee}`);
    },
});
