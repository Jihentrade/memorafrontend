const CodeReduction = require("../models/codeReduction");

exports.checkAndApplyReduction = async (req, res, next) => {
  const { promo, total } = req.body;
  let reduction = 0;
  let totalApresReduction = total;

  if (promo) {
    const code = await CodeReduction.findOne({ code: promo, actif: true });
    if (code) {
      reduction = code.reduction;
      totalApresReduction = total * (1 - reduction / 100);
    } else {
      return res.status(400).json({ error: "Code de réduction invalide" });
    }
  }

  req.reduction = reduction;
  req.totalApresReduction = totalApresReduction;
  next();
};
