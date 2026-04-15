"use client";
import { NextPage } from "next";
import { useFormik } from "formik";
import * as Yup from "yup";
// import styles from "@/app/(dashboard)/pages/page.module.scss";
import styles from "@/components/Templates/Locations/page.module.css";
import SeoComponent from "@/components/CommonComponents/SeoComponent";
import { requestHandler } from "@/helper/requestHandler";
import { asyncHandler } from "@/utils/asyncHandler";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import Navigation from "@/components/Layout/Navigation/Navigation";
import { MRT_PaginationState } from "material-react-table";
import Editor from "@/components/UI/Editor";
import Button from "@/components/UI/Button";
import { Modal } from "react-bootstrap";
import LocationPreview from "@/components/ModalPreviewpages/locations/page";
interface LocationProps {
  locationData: any; // Adjust the type as needed
}
const Locations: React.FC<LocationProps> = ({ locationData }: any) => {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { slug } = useParams();
  const [previewData, setPreviewData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const pageId = searchParams.get("pageId");
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [initialValues, setInitialValues] = useState({
    breadcrumbTitle: "",
    bannerTitle: "",
    slug: "",
    locationContent: [
      {
        pageSubHeading: "",
        location: [{ items: "", links:  "" }],
        browseBtnText: "",
        browseBtnLink: "",
      },
    ],
    seoTitle: "",
    seoDescription: "",
    metaRobot: "",
    schema: [""],
    template: "locations",
    categories: [""],
    featureImage: "",
  });

  const fetchData = useCallback(async () => {
    try {
      const templateResponse = await requestHandler(
        `/template/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize
        }`,
        {},
        "get"
      );
      const categoryResponse = await requestHandler(
        `/pages/list?pageIndex=${pagination.pageIndex + 1}&pageSize=${pagination.pageSize
        }&type=category&subType=${slug}`,
        {},
        "get"
      );

      const fetchedTemplates = templateResponse.data.map((item: any) => ({
        id: item._id,
        label: item.title,
        value: item.key,
      }));
      const fetchedCategories = categoryResponse.data.map((item: any) => ({
        id: item._id,
        label: item.title,
        value: item.slug,
      }));

      setData(fetchedTemplates);
      setCategories(fetchedCategories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [pagination, slug]);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (pageId) { 
      setInitialValues({
        breadcrumbTitle: locationData.breadcrumbTitle || "",
        bannerTitle: locationData.bannerTitle || "",
        slug: locationData.slug || "",
        locationContent: locationData.locationContent || [
          {
            pageSubHeading: "",
            location: [{ items: "", links:  "" }],
            browseBtnText: "",
            browseBtnLink: "",
          },
        ],
        seoTitle: locationData.seoTitle || "",
        seoDescription: locationData.seoDescription || "",
        metaRobot: locationData.metaRobot || "",
        schema: locationData.schema || [""],
        template: "locations",
        categories: locationData.categories || [""],
        featureImage: "",
      })
    }
    fetchData();
    // if (pageId) {
    //   asyncHandler(async () => {
    //     try {
    //       const response = await requestHandler(
    //         `/pages/view?pageId=${pageId}`,
    //         null,
    //         "get"
    //       );
    //       const data = response.data;
    //       setInitialValues({
    //         breadcrumbTitle: data.breadcrumbTitle || "",
    //         bannerTitle: data.bannerTitle || "",
    //         slug: data.slug || "",
    //         locationContent: data.locationContent || [
    //           {
    //             pageSubHeading: "",
    //             location: [{ items: "", links: "/templates/frame-1686564363.svg" }],
    //             browseBtnText: "",
    //             browseBtnLink: "",
    //           },
    //         ],
    //         seoTitle: data.seoTitle || "",
    //         seoDescription: data.seoDescription || "",
    //         metaRobot: data.metaRobot || "",
    //         schema: data.schema || [""],
    //         template: data.template || "locations",
    //         categories: data.categories || [""],
    //         featureImage: JSON.stringify(data.featureImage) || "",
    //       });
    //     } catch (error) {
    //       console.error("Error fetching page data:", error);
    //     }
    //   })();
    // }
  }, [pageId, fetchData]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: asyncHandler(async (values: any, { resetForm }: any) => {
      try {
        const transformedValues = {
          ...values,
          locationContent: JSON.stringify(
            values.locationContent.map((location: any) => ({
              ...location,
              location: location.location.map((locItem: any) => ({
                ...locItem,
                items: locItem.items || '',
                links: locItem.links || ''
              }))
            }))
          ),
          schema: JSON.stringify(values.schema) // Stringify the schema

        };
        // console.log(transformedValues)
        const endpoint = pageId ? `/editLocation?locationId=${pageId}` : `/addLocation`;
        const response = await requestHandler(endpoint, transformedValues, "post");

        if (response.status === 200) {
          toast.success(response.message || "Data saved successfully");
          if (!pageId) {
            resetForm({ values: initialValues });
          }
        } else {
          toast.error("Failed to save data");
        }
      } catch (error) {
        toast.error("Failed to save data");
        console.error("Submission error:", error);
      }
    }),

  });
  const handlePreview = () => {
    setShowModal(true); // Show the modal
    setPreviewData(formik.values);
    // alert(JSON.stringify(formik.values, null, 2));
    // console.log(formik.values, "sadsad");
  };
  const handleAddLocation = (e: any) => {
    e.preventDefault()
    formik.setFieldValue("locationContent", [
      ...formik.values.locationContent,
      {
        pageSubHeading: "",
        location: [{ items: "", links: "" }],
        browseBtnText: "",
        browseBtnLink: "",
      },
    ]);
  };
  const handleAddLocationItem = (index: any, e: any) => {
    e.preventDefault()
    const newLocationItem = { items: '', links: '' };
    const updatedLocationContent = [...formik.values.locationContent];
    updatedLocationContent[index].location.push(newLocationItem);
    formik.setFieldValue('locationContent', updatedLocationContent);
  };

  const handleRemoveLocation = (index: number) => {
    const updatedLocations = formik.values.locationContent.filter(
      (_: any, i: any) => i !== index
    );
    formik.setFieldValue("locationContent", updatedLocations);
  };
  const handleRemoveLocationItem = (index: any, locIndex: any) => {
    const updatedLocationContent = [...formik.values.locationContent];
    updatedLocationContent[index].location.splice(locIndex, 1);
    formik.setFieldValue('locationContent', updatedLocationContent);
  };


  return (
    <div>
      {/* <Navigation
        profile={pageId ? "Edit Page" : "Add Page"}
        user01="/images/user01.svg"
        bell01="/images/bell01.svg"
      /> */}
      <form onSubmit={formik.handleSubmit} className={styles.frameParent}>
        <div className={`container ${styles.templateSection}`}>
          <div className="row">
            <div className="col-7">
              <div className={styles.mb4}>
                <h4>Breadcrumb Section</h4>
                <div className="mb-3">
                  <input
                    name="breadcrumbTitle"
                    placeholder="Breadcrumb Title"
                    className="form-control"
                    value={formik.values.breadcrumbTitle}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div className={styles.mb4}>
                <h4>Page Title</h4>
                <div className="mb-3">
                  <input
                    name="bannerTitle"
                    placeholder="Page Title"
                    className="form-control"
                    value={formik.values.bannerTitle}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              <div className={styles.mb4}>
                <h4>Slug</h4>
                <div className="mb-3">
                  <input
                    name="slug"
                    placeholder="Slug"
                    className="form-control"
                    value={formik.values.slug}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>

              {/* Location Content Section */}
              {formik.values.locationContent.map((locationItem, index) => (
                <div key={index} className={styles.mb4}>
                  {/* <h4>Location Content</h4> */}
                  <h5>3.{index + 1} Location Content</h5>
                  <div className="mb-3">
                    <input
                      name={`locationContent[${index}].pageSubHeading`}
                      placeholder="Page Subheading"
                      className="form-control"
                      value={locationItem.pageSubHeading}
                      onChange={formik.handleChange}
                    />
                  </div>

                  {locationItem.location.map((locItem, locIndex) => (
                    <>
                      <h5>3.{index + 1}.{(locIndex + 1)} Location Item</h5>

                      <div key={locIndex} className="mb-3">
                        <input
                          name={`locationContent[${index}].location[${locIndex}].items`}
                          placeholder="Location Item"
                          className="form-control"
                          value={locItem.items}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div key={locIndex} className="mb-3">
                        <input
                          name={`locationContent[${index}].location[${locIndex}].links`}
                          placeholder="Location Link"
                          className="form-control mb-3"
                          value={locItem.links}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className={styles.btnEnd}>
                        <a
                          type="button"
                          className={styles.btnStyle}
                          onClick={() => handleRemoveLocationItem(index, locIndex)}
                        >
                          Remove Location Content
                        </a>
                      </div>
                    </>
                  ))}
                  <a
                    type="button"
                    className={`mb-3 ${styles.btnStyle}`}
                    onClick={(e) => handleAddLocationItem(index,e)} // Function to add location item
                  >
                    Add Location Item
                  </a>
                  <div className="mb-3">
                    <input
                      name={`locationContent[${index}].browseBtnText`}
                      placeholder="Browse Button Text"
                      className="form-control"
                      value={locationItem.browseBtnText}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <input
                      name={`locationContent[${index}].browseBtnLink`}
                      placeholder="Browse Button Link"
                      className="form-control"
                      value={locationItem.browseBtnLink}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className={styles.btnEnd}>
                    <a
                      type="button"
                      className={styles.btnStyle}
                      onClick={() => handleRemoveLocation(index)}
                    >
                      Remove Location Content
                    </a>
                  </div>

                  {/* Add Location Item Button */}
                  <a
                    type="button"
                    className={`mb-3 ${styles.btnStyle}`}
                    onClick={handleAddLocation}
                  >
                    Add Location Content
                  </a>
                </div>

              ))}


              <div className={styles.btnGroup}>
                {/* <a type="submit" className={`mb-3 ${styles.btnStyle}`}>
                Save Page
              </a> */}
                <Button
                  handle={formik.handleSubmit}
                  type="submit"
                  text="Save Page"
                  className={styles.btnStyle}
                />
                <Button
                  handle={handlePreview}
                  text="Preview"
                  className={`mb-3 ${styles.btnStyle}`}
                />
              </div>
            </div>

            <div className="col-5">
              <SeoComponent
                formik={formik}
                categories={categories}
                data={data}
              />
            </div>
          </div>


        </div>
      </form>
      <Modal show={showModal} onHide={handleClose} fullscreen centered>
        <Modal.Header closeButton>
          <Modal.Title>Preview Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <pre>{JSON.stringify(previewData, null, 2)}</pre> */}
          <LocationPreview data={previewData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Locations;
