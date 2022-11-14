"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EOrderMode = exports.EOrderStatus = void 0;
var EOrderStatus;
(function (EOrderStatus) {
    EOrderStatus[EOrderStatus["COMPLETED"] = 1] = "COMPLETED";
    EOrderStatus[EOrderStatus["PROCESSING"] = 2] = "PROCESSING";
    EOrderStatus[EOrderStatus["PARTIAL"] = 3] = "PARTIAL";
    EOrderStatus[EOrderStatus["IN_PROGRESS"] = 4] = "IN_PROGRESS";
    EOrderStatus[EOrderStatus["CANCELED"] = 5] = "CANCELED";
    EOrderStatus[EOrderStatus["PENDING"] = 6] = "PENDING";
})(EOrderStatus = exports.EOrderStatus || (exports.EOrderStatus = {}));
var EOrderMode;
(function (EOrderMode) {
    EOrderMode[EOrderMode["AUTO"] = 1] = "AUTO";
    EOrderMode[EOrderMode["MANUAL"] = 2] = "MANUAL";
})(EOrderMode = exports.EOrderMode || (exports.EOrderMode = {}));
//# sourceMappingURL=order.interfaces.js.map