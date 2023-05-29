import React from "react";
import TextInput from "../toolbox/TextInput";
import SelectInput from "../toolbox/SelectInput";

const ProductDetail = ({ categories, product, onSave, onChange }) => {
  return (
    <form onSubmit={onSave}>
      <h2>{product.id ? "Güncelle" : "Ekle"}</h2>
      <TextInput
        name="name"
        label="Ürün İsmi"
        value={product.name}
        onChange={onChange}
        error="Hata"
      ></TextInput>

      <SelectInput
        name="category"
        label="Kategori"
        value={product.category_id || ""}
        defaultOption="Seçiniz"
        options={categories.map((category) => ({
          value: category.id,
          text: category.category,
        }))}
        onChange={onChange}
        error="Hata"
      ></SelectInput>

      <TextInput
        name="detail"
        label="Detay"
        value={product.detail}
        onChange={onChange}
        error="Hata"
      ></TextInput>

      <TextInput
        name="price"
        label="Fiyat"
        value={product.price}
        onChange={onChange}
        error="Hata"
      ></TextInput>

      <TextInput
        name="stock"
        label="Stok"
        value={product.stock}
        onChange={onChange}
        error="Hata"
      ></TextInput>

      <button type="submit" className="btn btn-success">
        Kaydet
      </button>
    </form>
  );
};

export default ProductDetail;
