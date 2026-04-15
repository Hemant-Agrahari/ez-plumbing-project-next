import React from "react";
import { Modal } from "react-bootstrap";
import styles from "./notification.module.css";
import Button from "../../Button";
import { requestHandler } from "@/helper/requestHandler";
import { asyncHandler } from "@/utils/asyncHandler";
import { toast } from "react-toastify";

const NotificationModal = ({ show, setShow, notificationId, onDelete }: any) => {
  const handleClose = () => {
    setShow(false);
  };

  const handleDelete = async () => {
    if (notificationId) {
      await asyncHandler(async () => {
        await requestHandler(`/notification/delete?notificationId=${notificationId}`, {}, "get");
        onDelete(notificationId);
        toast.success("Notification deleted successfully")
      })();
    }
    handleClose();
  };

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered className={styles.Modal}>
        <Modal.Header className={styles.ModalHeader}>
          <Modal.Title className={styles.ModalTitle}>Are you Sure</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.ModalBody}>
          You want to delete this notification?
        </Modal.Body>
        <Modal.Footer className={styles.ModalFooter}>
          <Button text="No" handle={handleClose} className={styles.RejectButton} />
          <Button text="Yes" handle={handleDelete} className={styles.AcceptButton} />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NotificationModal;
