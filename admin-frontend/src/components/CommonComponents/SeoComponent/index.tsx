import React, { useEffect, useState } from "react";
import Dropdown from "@/components/UI/Dropdown";
import Button from "@/components/UI/Button";
import { FaTrash } from "react-icons/fa";
import styles from "./seo.module.scss";
import DynamicInput from "@/components/UI/Input";
import { setSelectedImage } from "@/lib/features/selectedImageSlice/selectedImageSlice";
import ImageUpload from "../../UI/Modal/UploadImages/Upload";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";

interface SeoComponentProps {
  formik: any;
  url?: string;
  imageId?: string;
  [key: string]: any;
}
interface Tag {
  id: string;
  label: string;
  value: string;
}

interface SelectedTag {
  title: string;
  slug: string;
}
const SeoComponent: React.FC<SeoComponentProps> = ({
  formik,
  url,
  categories,
  tags,
  author,
  data,
  imageId,
  disabled,
  ...props
}) => {
  const [showModal, setShowModal] = useState(false);
  const selectedImage = useAppSelector(
    (state) => state.selectedImage.selectedImage
  );
  const dispatch = useAppDispatch();
  // console.log(tags, "tags defined")
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleImageSelect = (image: any) => {
    dispatch(setSelectedImage(image));
    // console.log(image, "image data");
  };

  useEffect(() => {
    if (selectedImage) {
      formik.setFieldValue("featureImage", JSON.stringify(selectedImage.id));
    }
  }, [selectedImage]);
  const handleAddSchema = (e: any) => {
    e.preventDefault()
    formik.setFieldValue("schema", [...formik.values.schema, ""]);
  };

  const handleRemoveSchema = (index: number) => {
    const updatedschema = formik.values?.schema.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue("schema", updatedschema);
  };



  const handleTemplateChange = (selectedOption: any) => {
    // console.log(selectedOption);

    formik.setFieldValue("template", selectedOption.value);
  };
  const handleAuthorChange = (selectedOption: any) => {
    // console.log(selectedOption);

    formik.setFieldValue("author", selectedOption.value);
  };

  const options = [
    { value: "option1", label: "Design" },
    { value: "option2", label: "Hr" },
    { value: "option3", label: "Seo" },
  ];

  return (
    <div className={styles.seoWrapper}>
      <div className={styles.groupDiv}>
        <h5 className={styles.seo}>SEO</h5>
        <div className={styles.frameParent1}>
          <DynamicInput
            type="text"
            name="seoTitle"
            placeholder="SEO Title"
            value={formik.values?.seoTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={disabled}
          />
          {formik.touched.seo?.seoTitle && formik.errors.seo?.seoTitle ? (
            <div className={styles.error}>{formik.errors.seoTitle}</div>
          ) : null}

          <DynamicInput
            type="text"
            name="seoDescription"
            placeholder="SEO Description"
            value={formik.values?.seoDescription}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={disabled}
          />
          {formik.touched.seo?.seoDescription &&
            formik.errors.seo?.seoDescription ? (
            <div className={styles.error}>{formik.errors.seoDescription}</div>
          ) : null}

          <DynamicInput
            type="text"
            name="metaRobot"
            placeholder="Meta Robot"
            value={formik.values?.metaRobot}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={disabled}
          />
          {formik.touched.seo?.metaRobot && formik.errors.seo?.metaRobot ? (
            <div className={styles.error}>{formik.errors.metaRobot}</div>
          ) : null}

          <div className="mb-0">
            <h5>Add Schema</h5>
            {formik.values?.schema?.map((schema: string, index: number) => (
              <div key={index} className={`${styles.frameParent1}`}>
                <div className={styles.SeoInputComponents}>
                  <DynamicInput
                    as="textarea"
                    rows={3}
                    name={`schema[${index}]`}
                    value={schema}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={disabled}
                  />
                  {!disabled && (
                    <FaTrash
                      onClick={() => handleRemoveSchema(index)}
                      style={{ position: "absolute", right: "0" }}
                    />
                  )}
                </div>
              </div>
            ))}
            {!disabled && (
              <Button
                text="Add Schema"
                type="button"
                handle={handleAddSchema}
                className={styles.btnStyle}
              >
                Add Schema
              </Button>
            )}
          </div>


          {/*   <div className="mb-0">
            <h5>Feature Image</h5>

            {(imageId || selectedImage) && (
              <div className={styles.imagePreview}>
                <img
                  src={selectedImage ? selectedImage?.image : url || ""}
                  alt="Selected"
                  className={styles.imagePreviewImg}
                  height={400}
                />
                <DynamicInput
                  type="text"
                  className={styles.displayNone}
                  value={imageId ? selectedImage?.id : url || ""}
                  name="featureImage"
                  onChange={(e: any) =>
                    formik.setFieldValue(
                      "featureImage",
                      e.target.value || imageId
                    )
                  }
                  style={{ display: "none" }}
                  disabled={disabled}
                />
              </div>
            )}
            {!disabled && (
              <Button
                text="Choose Image..."
                type="button"
                handle={handleOpenModal}
                className={`${styles.btnStyle} mb-1`}
              >
                Open Modal
              </Button>
            )}
          </div>*/}
          {/* {console.log("data", data)} */}

          {/* {data && (
            <>
              <Dropdown
                placeholder="Templates..."
                options={data}
                onChange={handleTemplateChange}
                value={data.find(
                  (data: any) => data.value === formik.values.template
                )}
                className="my-custom-class"
              />
              {formik.touched.template && formik.errors.template ? (
                <div className={styles.error}>{formik.errors.template}</div>
              ) : null}
            </>
          )} */}
          {categories && (
            <Dropdown
              placeholder="Categories..."
              className={styles.dropdown}
              options={categories}
              onChange={(selectedOptions: any) => {
                const values = selectedOptions.map((option: any) => ({
                  title: option.label,
                  slug: option.value,
                }));
                formik.setFieldValue("categories", values);
              }}
              value={categories.filter((tag: Tag) => 
                formik.values?.categories?.some((t: SelectedTag) => t.slug === tag.value)
              )}
              isMulti={true}
              disabled={disabled}
            />
          )}
          {tags && (
            <Dropdown
              placeholder="tags..."
              className={styles.dropdown}
              options={tags}
              onChange={(selectedOptions: any) => {
                const values = selectedOptions.map((option: any) => ({
                  title: option.label,
                  slug: option.value,
                }));
                formik.setFieldValue("tags", values);
              }}
              value={tags.filter((tag: Tag) => 
                formik.values?.tags?.some((t: SelectedTag) => t.slug === tag.value)
              )}
             
              isMulti={true}
              disabled={disabled}
            />
          )}
          {author && (
            <>
              <Dropdown
                placeholder="Author"
                options={author}
                onChange={handleAuthorChange}
                value={author.find(
                  (author: any) => author.value === formik.values.author
                )}
                className="my-custom-class"
              />
              {formik.touched.author && formik.errors.author ? (
                <div className={styles.error}>{formik.errors.author}</div>
              ) : null}
            </>
          )}
        </div>
        <ImageUpload
          show={showModal}
          handleClose={handleCloseModal}
          onImageSelect={handleImageSelect}
        />
      </div>
      <ImageUpload
        show={showModal}
        handleClose={handleCloseModal}
        onImageSelect={handleImageSelect}
      />
    </div>
  );
};

export default SeoComponent;
