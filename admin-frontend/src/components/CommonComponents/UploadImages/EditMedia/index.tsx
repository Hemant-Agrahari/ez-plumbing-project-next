import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { requestHandler } from "@/helper/requestHandler";
import ImageDetails from "./imageDetails";
import { asyncHandler } from "@/utils/asyncHandler";

const EditModal = ({ isOpen, onClose, onSave, rowData }: any) => {
  const [formData, setFormData] = useState<any>({
    id: "",
    title: "",
    caption: "",
    altTag: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (rowData?.id) {
        await asyncHandler(async () => {
          const response = await requestHandler(`/media/view?mediaId=${rowData.id}`, {}, 'get');
          setFormData(response.data);
        })();
      }
    };

    fetchData();
  }, [rowData]);


  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageDelete = () => {
    setFormData({ ...formData, src: "" });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Body>
        <ImageDetails
          key={formData.id}
          onDelete={handleImageDelete}
          selectedImage={formData}
          onUpdate={handleChange}
          onClose={onClose}
        />
      </Modal.Body>
    </Modal>
  );
};

export default EditModal;
