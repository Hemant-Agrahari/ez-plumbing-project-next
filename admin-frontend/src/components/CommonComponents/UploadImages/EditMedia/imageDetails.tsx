import React, { useState, useRef, useEffect } from "react";
import { Formik, FormikProps, FormikHelpers } from "formik";
import * as Yup from "yup";
import DynamicInput from "../../../UI/Input";
import styles from "../page.module.css";
import Button from "../../../UI/Button";
import { FaEdit } from "react-icons/fa";
import { requestHandler } from "@/helper/requestHandler";
import { toast } from "react-toastify";
import { asyncHandler } from "@/utils/asyncHandler";

interface ImageObject {
  image: File | string;
}

interface SelectedImage {
  title: string;
  caption: string;
  altTag: string;
  description: string;
  id: number;
  image: string;
}

interface ImageDetailsProps {
  selectedImage: SelectedImage;
  onUpdate: (values: SelectedImage) => void;
  onDelete: (id: number) => void;
  onClose: () => void;
}

const ImageDetails: React.FC<ImageDetailsProps> = ({
  selectedImage,
  onUpdate,
  onDelete,
  onClose,
}) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(selectedImage.image);
  const [imageName, setImageName] = useState<string>("");
  const [imageResolution, setImageResolution] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const extractImageName = (url: string) => {
      const imageName = url.split("/").pop()?.split("?")[0] || "unknown";
      setImageName(imageName);
    };

    const fetchImageResolution = (url: string) => {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        setImageResolution({ width: image.width, height: image.height });
      };
    };

    extractImageName(selectedImage.image);
    fetchImageResolution(selectedImage.image);
  }, [selectedImage.image]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));

      // Update image name and resolution for the new file
      setImageName(file.name);
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        setImageResolution({ width: img.width, height: img.height });
      };
    }
  };

  const handleDelete = asyncHandler(async (id: any) => {
    const rowId = id;
    const response = await requestHandler(
      `/media/delete?mediaId=${rowId}`,
      {},
      "get"
    );
    if (response.status===200) {
      toast.success(response.message || "Deleted Successfully");
      onDelete(id); // Call onDelete to handle deletion in parent component
    } else {
      toast.error(response.message || "Failed to Delete");
    }
  });

  const handleEditClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFormSubmit = async (
    values: SelectedImage,
    actions: FormikHelpers<SelectedImage>
  ) => {
    await asyncHandler(async () => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("caption", values.caption || "");
      formData.append("altTag", values.altTag || "");
      formData.append("description", values.description || "");
      formData.append("id", values.id.toString());
      if (imageFile) {
        formData.append("featureImage", imageFile);
      }
      formData.forEach((value, key) => {
        // console.log(`${key}: ${value}`);
      });
      const response = await requestHandler(
        `/media/edit?mediaId=${values.id}`,
        formData,
        "post"
      );
      if (response.status === 200) {
        toast.success(response.message);
        onClose();
      } else {
        throw new Error("Image upload failed");
      }
    })();
    actions.setSubmitting(false);
  };

  return (
    <div className={styles.imageDetailsContainer}>
      <div className={styles.imageWrapper}>
        <div className={styles.previewImageEditContainer}>
          <img
            src={imagePreview}
            alt={selectedImage.title}
            className={styles.previewEditImage}
            width={145}
            height={(145 * 3) / 4}
          />
        </div>

        <div className={styles.buttonWrapper}>
          <p>Image Name: {imageName}</p>
          {imageResolution && (
            <p>
              Resolution: {imageResolution.width}x{imageResolution.height}
            </p>
          )}
          <Button
            className={styles.btnStyleEdit}
            text="Edit Image"
            handle={handleEditClick}
          />
          <Button
            text="Delete Permanently"
            className={styles.btnStyleDelete}
            handle={() => handleDelete(selectedImage.id)}
          />
        </div>
      </div>
      <Formik initialValues={selectedImage} onSubmit={handleFormSubmit}>
        {({
          handleSubmit,
          handleChange,
          values,
        }: FormikProps<SelectedImage>) => (
          <form
            id="edit-form"
            onSubmit={handleSubmit}
            className={styles.editForm}
          >
            <div className={styles.formGroup}>
              <label htmlFor="id">Id</label>
              <DynamicInput
                id="id"
                name="id"
                type="text"
                disabled
                value={values.id}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="title">Title</label>
              <DynamicInput
                id="title"
                name="title"
                type="text"
                value={values.title}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="caption">Caption</label>
              <DynamicInput
                id="caption"
                name="caption"
                type="text"
                value={values.caption}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="altTag">Alt Tag</label>
              <DynamicInput
                id="altTag"
                name="altTag"
                type="text"
                value={values.altTag}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <DynamicInput
                id="description"
                name="description"
                type="text"
                value={values.description}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formGroup}>
              <input
                id="image"
                name="images"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                className={styles.fileInput}
                style={{ display: "none" }}
              />
            </div>
            <div className={styles.buttonGroup}>
            <Button
                text="Cancel"
                handle={onClose}
                className={styles.btnStyleWhite}
              />
              <Button
                text="Save"
                handle={handleSubmit}
                type="submit"
                className={styles.saveButton}
              />

            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ImageDetails;
