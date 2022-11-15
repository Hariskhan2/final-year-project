import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function ProductForm() {
  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
  const initialValues = {
    title: "",
    description: "",
    type: "",
    price: "",
    file: [],
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required Field!"),
    description: Yup.string().required("Required Field!"),
    type: Yup.string().required("Required Field!"),
    price: Yup.number().required("Required Field!"),
    profileImage: Yup.mixed()
      .nullable()
      .required("A file is required")
      .test(
        "upload file",
        (value) => !value || (value && value.size <= 1024 * 1024)
      )
      .test(
        "format",
        "upload file",
        (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type))
      ),
  });

  const onSubmit = (values) => console.log("values", values);
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      <Form>
        <div className="form">
          <div className="form__control">
            <div className="form__productBasicInfo">
              <h3>Include Some Details</h3>
              <div className="form__productAdTitle">
                <label htmlFor="title">Ad title</label>
                <Field type="text"></Field>
                <small>
                  Mention the key features of your item(e.g. model, brand, type
                  etc.)
                </small>
              </div>
              <div className="form__productDescription">
                <label htmlFor="description">Description</label>
                <Field type="textarea"></Field>
                <small>include condition, features etc.</small>
              </div>
              <div className="form__productType">
                <label htmlFor="type">Type</label>
                <Field type="select"></Field>
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
}

export default ProductForm;
