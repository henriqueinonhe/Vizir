db.createCollection("DialCodesPriceRateTableData");
const dialCodesList =  [11, 12, 13, 14, 15, 16, 17, 18, 19, 21, 22, 24, 27, 28, 31, 32, 33, 34, 35, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48, 49, 51, 53, 54, 55, 61, 62, 63, 64, 65, 66, 67, 68, 69, 71, 73, 74, 75, 77, 79, 81, 82, 83, 84, 85, 86, 87, 88, 89, 91, 92, 93, 94, 95, 96, 97, 98, 99];

for(const fromDialCode of dialCodesList){for(const toDialCode of dialCodesList){db.DialCodesPriceTableData.insert({fromDialCode, toDialCode, priceRate: null});}}

db.DialCodesPriceTableData.findOneAndUpdate({fromDialCode: 11, toDialCode: 16}, {$set: {priceRate: 190e2}});
db.DialCodesPriceTableData.findOneAndUpdate({fromDialCode: 16, toDialCode: 11}, {$set: {priceRate: 290e2}});
db.DialCodesPriceTableData.findOneAndUpdate({fromDialCode: 11, toDialCode: 17}, {$set: {priceRate: 170e2}});
db.DialCodesPriceTableData.findOneAndUpdate({fromDialCode: 17, toDialCode: 11}, {$set: {priceRate: 270e2}});
db.DialCodesPriceTableData.findOneAndUpdate({fromDialCode: 11, toDialCode: 18}, {$set: {priceRate: 090e2}});
db.DialCodesPriceTableData.findOneAndUpdate({fromDialCode: 18, toDialCode: 11}, {$set: {priceRate: 190e2}});