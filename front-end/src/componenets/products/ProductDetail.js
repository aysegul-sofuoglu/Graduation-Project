import React from "react";
import TextInput from "../toolbox/TextInput";
import SelectInput from "../toolbox/SelectInput";

const ProductDetail = ({ categories, product, onSave, onChange, errors }) => {
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
        value={isNaN(product.price)?"":product.price.toString()}
        onChange={onChange}
        error={errors.price}
      ></TextInput>

      <TextInput
        name="stock"
        label="Stok"
        value={isNaN(product.stock)?"":product.stock.toString()}
        onChange={onChange}
        error={errors.stock}
      ></TextInput>

      <button type="submit" className="btn btn-success">
        Kaydet
      </button>
    </form>
  );
};

export default ProductDetail;
