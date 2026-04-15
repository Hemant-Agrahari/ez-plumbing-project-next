"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import DynamicInput from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Navigation from "@/components/Layout/Navigation/Navigation";
import { asyncHandler } from "@/utils/asyncHandler";
import { toast } from "react-toastify";
import { Formik } from "formik";
import { requestHandlerUserId } from "@/helper/requestHandler";
import styles from "./page.module.css";
import { getTokenCookie, getUserIdCookie } from "@/helper/auth";

const AdminProfile = () => {
  const [adminDetails, setAdminDetails] = useState<any>({
    name: "",
    mobile: "",
    email: "",
    profile: ""
  });
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newpassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchData = async () => {

      const token = getTokenCookie('auth');
      const userId = getUserIdCookie('userId');
      // console.log(userId);

      if (!token || !userId) {
        console.error("Missing auth or userId cookie");
        return;
      }


      try {
        const response = await requestHandlerUserId(
          `/subadmin/view?subAdminId=`,
          {},
          "get"
        );

        setAdminDetails(response?.data);
      } catch (error) {
        console.error(error);
        setAdminDetails({
          name: "",
          mobile: "",
          email: "",
          profile: ""
        });
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (values: any) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('email', values.email);
    formData.append('mobile', values.mobile);
    if (image) {
      formData.append('profileImage', image);
    }

    await asyncHandler(async () => {
      const response = await requestHandlerUserId(
        `/updateprofile?userId=`,
        formData,
        "post"
      );

      if (response.status === 200) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    })();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePassword = async (values: any) => {
    if (values.newpassword !== values.confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }

    await asyncHandler(async () => {
      const response = await requestHandlerUserId(
        `/changepasswordPost?userId=`,
        {
          oldpassword: values.currentPassword,
          newpassword: values.newpassword,
        },
        "post"
      );

      if (response) {
        toast.success(response.message);
        setChangePassword({
          currentPassword: "",
          newpassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(response.message);
      }
    })();
  };

  return (
    <>
      <Navigation
        profile="Admin Profile"
        user01="/images/user01.svg"
        bell01="/images/bell01.svg"
      />
      <div className="main w-100">
        <div className={styles.AdminProfileWrapper}>
          <div className={styles.PersonalInformation}>
            <div className={styles.HeaderTitle}>Personal Information</div>

            <Formik
              initialValues={adminDetails}
              onSubmit={handleUpdate}
              enableReinitialize
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className={styles.UserContactDetails}>
                  <div className={styles.ImageWrapper}>
                    <img
                      src={imagePreview || `${process.env.NEXT_PUBLIC_BACKEND_URL}${adminDetails.profile}` || "/images/user-image.png"}
                      alt="Profile"
                      width="148"
                      height="143"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className={styles.EditIcon}>
                      <img src="/images/edit-btn.svg" alt="Edit" width="40" height="40" />
                    </label>
                  </div>

                  <div className={styles.InputGroup}>
                    <div className={styles.InputLabel}>Name</div>
                    <DynamicInput
                      name="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                    />
                  </div>
                  <div className={styles.InputGroup}>
                    <div className={styles.InputLabel}>Mobile Number</div>
                    <DynamicInput
                      name="mobile"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="text"
                    />
                  </div>
                  <div className={styles.InputGroup}>
                    <div className={styles.InputLabel}>Email</div>
                    <DynamicInput
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="email"
                    />
                  </div>
                  <div className={styles.AlignEnd}>
                    <Button handle={handleSubmit} text="Update" type="submit" className={styles.BtnBlue} disabled={isSubmitting} />
                  </div>
                </form>
              )}
            </Formik>
          </div>

          <div className={styles.ChangePassword}>
            <div className={styles.HeaderTitle}>Change Password</div>
            <Formik
              initialValues={changePassword}
              onSubmit={handleChangePassword}
              enableReinitialize
            >
              {({
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className={`${styles.UserContactDetails} mt-5`}>
                  <div className={styles.InputGroup}>
                    <div className={styles.InputLabel}>Current Password</div>
                    <DynamicInput
                      name="currentPassword"
                      value={values.currentPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                    />
                  </div>
                  <div className={styles.InputGroup}>
                    <div className={styles.InputLabel}>New Password</div>
                    <DynamicInput
                      name="newpassword"
                      value={values.newpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                    />
                  </div>
                  <div className={styles.InputGroup}>
                    <div className={styles.InputLabel}>Confirm New Password</div>
                    <DynamicInput
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="password"
                    />
                  </div>
                  <div className={styles.AlignEnd}>
                    <Button handle={handleSubmit} text="Change Password" type="submit" className={styles.BtnBlue} disabled={isSubmitting} />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
