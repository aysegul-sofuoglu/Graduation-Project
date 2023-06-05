import React, { useEffect, useState } from "react";
import TextInput from "../toolbox/TextInput";
import SelectInput from "../toolbox/SelectInput";
import axios from "axios";

const ProductDetail = ({ categories, product, onSave, onChange, errors }) => {

  const [exchangeRate, setExchangeRate] = useState(0);
  const [tryExchangeRate, setTryExchangeRate] = useState(0);



  useEffect(() => {
    async function getExchangeRates() {
      try {
        const response = await axios.get(
          "https://api.exchangerate-api.com/v4/latest/USD"
        );
        const exchangeRates = response.data.rates;

   
        setExchangeRate(exchangeRates.USD);
        setTryExchangeRate(1/exchangeRates.TRY);
      } catch (error) {
        console.error("Döviz kurları alınırken bir hata oluştu:", error);
      }
    }

    getExchangeRates();
  }, []);

  const calculateProfitLoss = () => {
    const { price, supply_cost } = product;
    const parsedPrice = parseFloat(price);
    const parsedSupplyCost = parseFloat(supply_cost);

    if (isNaN(parsedPrice) || isNaN(parsedSupplyCost)) {
      return { usd: NaN, try: NaN };
    }

    const profitLoss = parsedPrice - parsedSupplyCost;

    
    const usdProfitLoss = profitLoss * exchangeRate; 
    const tryProfitLoss = profitLoss * tryExchangeRate; 

    return { usd: usdProfitLoss.toFixed(2), try: tryProfitLoss.toFixed(2) };
  };

  const calculatedProfitLoss = calculateProfitLoss();


  return (
    <form onSubmit={onSave}>
      <h2>{product.id ? "Güncelle" : "Ekle"}</h2>
      <TextInput
        name="name"
        label="Ürün İsmi"
        value={product.name}
        onChange={onChange}
        error={errors.name}
      ></TextInput>

      <SelectInput
        name="category_id"
        label="Kategori"
        value={product.category_id}
        defaultOption="Seçiniz"
        options={categories.map((category) => ({
          value: category.id,
          text: category.category,
        }))}
        onChange={onChange}
        error={errors.category_id}
      ></SelectInput>

      <TextInput
        name="detail"
        label="Detay"
        value={product.detail}
        onChange={onChange}
        error={errors.detail}
      ></TextInput>

      <TextInput
        name="price"
        label="Fiyat"
        value={isNaN(product.price) ? "" : product.price.toString()}
        onChange={onChange}
        error={errors.price}
      ></TextInput>

      <TextInput
        name="stock"
        label="Stok"
        value={isNaN(product.stock) ? "" : product.stock.toString()}
        onChange={onChange}
        error={errors.stock}
      ></TextInput>

      <TextInput
        name="supply_cost"
        label="Tedarik masrafı"
        value={isNaN(product.supply_cost) ? "" : product.supply_cost.toString()}
        onChange={onChange}
        error={errors.supply_cost}
      />

<div>
        {Number.isNaN(calculatedProfitLoss.usd) ? null : (
          <>
            <label>Kar/Zarar (TL):</label>
            <p>
              {calculatedProfitLoss.usd}{" "}
              {calculatedProfitLoss.usd > 0
                ? "(Kar)"
                : calculatedProfitLoss.usd < 0
                ? "(Zarar)"
                : ""}
            </p>
          </>
        )}

        {Number.isNaN(calculatedProfitLoss.try) ? null : (
          <>
            <label>Kar/Zarar (USD):</label>
            <p>
              {calculatedProfitLoss.try}{" "}
              {calculatedProfitLoss.try > 0
                ? "(Kar)"
                : calculatedProfitLoss.try < 0
                ? "(Zarar)"
                : ""}
            </p>
          </>
        )}
      </div>

      <button type="submit" className="btn btn-success">
        Kaydet
      </button>
     
    </form>
  );
};

export default ProductDetail;
