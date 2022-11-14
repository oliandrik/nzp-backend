"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EClientRank = exports.EClientGender = exports.EClientStatus = void 0;
var EClientStatus;
(function (EClientStatus) {
    EClientStatus[EClientStatus["ACTIVE"] = 1] = "ACTIVE";
    EClientStatus[EClientStatus["SUSPENDED"] = 2] = "SUSPENDED";
    EClientStatus[EClientStatus["UNCONFIRMED"] = 3] = "UNCONFIRMED";
})(EClientStatus = exports.EClientStatus || (exports.EClientStatus = {}));
var EClientGender;
(function (EClientGender) {
    EClientGender[EClientGender["OTHER"] = 1] = "OTHER";
    EClientGender[EClientGender["FEMALE"] = 2] = "FEMALE";
    EClientGender[EClientGender["MALE"] = 3] = "MALE";
})(EClientGender = exports.EClientGender || (exports.EClientGender = {}));
var EClientRank;
(function (EClientRank) {
    EClientRank[EClientRank["NEW"] = 1] = "NEW";
    EClientRank[EClientRank["BRONZE"] = 2] = "BRONZE";
    EClientRank[EClientRank["SILVER"] = 3] = "SILVER";
    EClientRank[EClientRank["GOLS"] = 4] = "GOLS";
    EClientRank[EClientRank["PLATINUM"] = 5] = "PLATINUM";
    EClientRank[EClientRank["DIAMON"] = 6] = "DIAMON";
    EClientRank[EClientRank["VIP"] = 7] = "VIP";
    EClientRank[EClientRank["VIP_3"] = 8] = "VIP_3";
})(EClientRank = exports.EClientRank || (exports.EClientRank = {}));
//# sourceMappingURL=client.interfaces.js.map