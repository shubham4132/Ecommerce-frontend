type RegisterFormControl = {
  name: string;
  label: string;
  placeholder?: string;
  componentType: "input";
  type?: string;
};

export const registerFormControls: RegisterFormControl[] = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];
type LoginFormControl = {
  name: string;
  label: string;
  placeholder?: string;
  componentType: "input";
  type?: string;
};
export const loginFormControls: LoginFormControl[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: "earphone", label: "Earphone" },
      { id: "mobile", label: "Mobile" },
      { id: "watches", label: "Watches" },
      { id: "television", label: "Television" },
      { id: "laptop", label: "Laptop" },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
      { id: "sony", label: "Sony" },
      { id: "jbl", label: "Jbl" },
      { id: "oneplus", label: "OnePlus" },
      { id: "apple", label: "Apple" },
      { id: "samsung", label: "Samsung" },
      { id: "panasonic", label: "Panasonic" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];
