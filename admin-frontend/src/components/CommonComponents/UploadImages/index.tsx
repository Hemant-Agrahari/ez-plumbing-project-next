import React, { ChangeEvent, useEffect, useState } from "react";
import { Formik, FieldArray, FormikHelpers, FormikProps } from "formik";
import styles from "./page.module.css";
import * as Yup from "yup";
import { requestHandler } from "@/helper/requestHandler";
import DynamicInput from "../../UI/Input";
import ImageDetails from "./EditMedia/imageDetails";
import { toast } from "react-toastify";
import { setSelectedImage } from "@/lib/features/selectedImageSlice/selectedImageSlice"; // Ensure this path is correct
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { asyncHandler } from "@/utils/asyncHandler";
import { FaRegCircleCheck } from "react-icons/fa6";

interface ImageObject {
  image: File | string;
}

interface FormValues {
  images: ImageObject[];
  selectedImage?: {
    title: string;
    caption: string;
    altTag: string;
    description: string;
    id: number;
    image: string;
  };
}

const initialValues: FormValues = {
  images: [],
  selectedImage: undefined,
};

// const validationSchema = Yup.object().shape({
//     images: Yup.array().of(
//         Yup.object().shape({
//             image: Yup.mixed().required('Image is required'),
//         })
//     ),
//     selectedImage: Yup.object().shape({
//         title: Yup.string().required(),
//         caption: Yup.string(),
//         altTag: Yup.string(),
//         description: Yup.string(),
//         id: Yup.number().required(),
//         image: Yup.string().required()
//     })
// });

const ImageUploads: React.FC<any> = ({ handleClose }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedImage, setSelectedImageState] =
    useState<FormValues["selectedImage"]>(undefined);
  const [existingImages, setExistingImages] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const previousSelectedImage = useAppSelector(
    (state) => state.selectedImage.selectedImage
  );
  const fetchImages = asyncHandler(async () => {
    const response = await requestHandler(
      "/media/list?pageIndex=1&pageSize=100&search",
      {},
      "get"
    );
    if (response.status === 200) {
      const images = response.data || [];
      setExistingImages(images);
      // console.log(images, "images");
      if (previousSelectedImage) {
        setSelectedImageState(previousSelectedImage as any); // Use previously selected image
      } else if (images.length > 0) {
        const firstImage = images[0];
        const imageDetails = {
          title: firstImage.title || "",
          caption: firstImage.caption || "",
          altTag: firstImage.altTag || "",
          description: firstImage.description || "",
          id: firstImage.id,
          image: firstImage.image,
        };
        setSelectedImageState(imageDetails); // Set first image as selected if no image was previously selected
        dispatch(setSelectedImage(imageDetails)); // Dispatch selected image
      }
    } else {
      console.error("Failed to fetch images");
    }
  });
  // console.log(selectedImage, "selectedImage");
  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageChange = async (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const files = e.currentTarget.files;
    if (files) {
      const imagesArray: ImageObject[] = Array.from(files).map((file) => ({
        image: file,
      }));
      setFieldValue("images", imagesArray);

      const formData = new FormData();
      imagesArray.forEach((imageObj, index) => {
        formData.append(`images[${index}]`, imageObj.image as File);
      });

      await asyncHandler(async () => {
        const response = await requestHandler("/media/add", formData, "post");
        if (response.status === 200) {
          toast.success(response.message);
          setExistingImages((prevImages) => [...prevImages, ...response.data]);
        } else {
          console.error("Failed to upload images");
          toast.error("Something went wrong");
        }
      })();
    }
  };

  const handleImageClick = (index: number) => {
    const selected = existingImages[index];
    const imageDetails = {
      title: selected.title || "",
      caption: selected.caption || "",
      altTag: selected.altTag || "",
      description: selected.description || "",
      id: selected.id,
      image: selected.image,
    };
    setSelectedImageState(imageDetails);
  };
  const handleImageSave = (index: number) => {
    const selected = existingImages[index];
    const imageDetails = {
      title: selected.title || "",
      caption: selected.caption || "",
      altTag: selected.altTag || "",
      description: selected.description || "",
      id: selected.id,
      image: selected.image,
    };
    setSelectedImageState(imageDetails);
    dispatch(setSelectedImage(imageDetails));
    handleClose();
  };

  const handleUpdate = (updatedImage: any) => {
    setExistingImages((prevImages) =>
      prevImages.map((img) => (img.id === updatedImage.id ? updatedImage : img))
    );
    fetchImages();
    setSelectedImageState(updatedImage);
    dispatch(setSelectedImage(updatedImage));
  };

  const handleDelete = async (id: number) => {
    await asyncHandler(async () => {
      const response = await requestHandler(
        `/media/delete/${id}`,
        {},
        "delete"
      );
      if (response.status === 200) {
        toast.success(response.message || "Deleted Successfully");
        setExistingImages((prevImages) =>
          prevImages.filter((img) => img.id !== id)
        );
        setSelectedImageState(undefined); // Clear local state
        dispatch(setSelectedImage(null)); // Dispatch null to clear selected image in Redux
      } else {
        console.error("Failed to delete image");
      }
    })();
  };

  return (
    <div className={`${styles.uploadContainer}`}>
      <div className="container">
        <div className="row d-flex justify-content-center w-100">
          <div className="col-6">
            <div className={styles.imagePreviews}>
              {existingImages.length === 0 ? (
                <p>No images available</p>
              ) : (
                existingImages.map((img, index) => (
                  <div
                    key={img.id}
                    style={{
                      scale:
                        selectedImage && selectedImage.id === img.id
                          ? "1.2"
                          : "",
                    }}
                    className={styles.previewImageContainer}
                    onClick={() => {
                      handleImageClick(index);
                      setImageIndex(index);
                    }}
                  >
                    <div className={styles.selectedImageWrapper}>
                      {selectedImage && selectedImage.id === img.id && (
                        <FaRegCircleCheck
                          color="#25b900"
                          size={16}
                          className={styles.icon}
                        />
                      )}

                      <img
                        src={img.image}
                        alt={img.title || "Image"}
                        width={145}
                        height={(145 * 3) / 4}
                        className={styles.previewImage}
                      />
                    </div>
                  </div>
                ))
              )}

              <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={(
                  values: FormValues,
                  actions: FormikHelpers<FormValues>
                ) => {
                  // console.log(values);
                }}
              >
                {({
                  values,
                  handleSubmit,
                  setFieldValue,
                }: FormikProps<FormValues>) => (
                  <form
                    onSubmit={handleSubmit}
                    className="d-flex gap-4 justify-content-start mt-4"
                  >
                    <FieldArray name="images">
                      {() => (
                        <>
                          <DynamicInput
                            id="file-input"
                            type="file"
                            accept="image/*"
                            onChange={(e: any) =>
                              handleImageChange(e, setFieldValue)
                            }
                            multiple
                            style={{ display: "none" }}
                          />
                          <label
                            htmlFor="file-input"
                            className={styles.uploadButton}
                          >
                            Upload Image
                          </label>
                        </>
                      )}
                    </FieldArray>
                    <label
                      className={styles.uploadButton}
                      onClick={() => handleImageSave(imageIndex)}
                    >
                      Save
                    </label>
                  </form>
                )}
              </Formik>
            </div>
          </div>
          <div className="col-6">
            {selectedImage && (
              <ImageDetails
                key={selectedImage.id}
                onDelete={handleDelete}
                selectedImage={selectedImage}
                onUpdate={handleUpdate}
                onClose={handleClose}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploads;
