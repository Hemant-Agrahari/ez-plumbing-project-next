import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "../../Button";
import ImageUploads from "../../../CommonComponents/UploadImages";

const ImageUpload = ({ show, handleClose, onClose }: any) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} size="xl">
        <Modal.Body>
          <ImageUploads handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ImageUpload;
