import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { allRegionsAtom, cartDataAtom } from "@/lib/atoms";
import { Input, Modal, Textarea, Button, Notification, Select } from "@mantine/core";
import { apiURL } from "@/lib/api";

const QuotationModal = ({ opened, onClose }) => {
  const cartItems = useRecoilValue(cartDataAtom);
  const setCartItems = useSetRecoilState(cartDataAtom)
  const allRegions = useRecoilValue(allRegionsAtom)
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    region: "",
    phoneNumber: "",
    email: "",
    comments: ""
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const products = cartItems.map((item) => ({
      product: item.id,
      quantity: item.quantity
    }));

    const payload = {
      client_email: formData.email,
      name: formData.name,
      phone: formData.phoneNumber,
      company_name: formData.companyName,
      region: formData.region,
      comments: formData.comments,
      products: products
    };

    try {
      const response = await fetch(apiURL+'/api/lead/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setCartItems([])
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      setSubmissionStatus('error');
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Request Quotation">
      {submissionStatus === 'success' ? (
        <Notification color="teal" title="Success" onClose={onClose}>
          Quotation sent successfully.
        </Notification>
      ) : (
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <Input
            required
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
          />
       
           <Select
            value={formData.region}
            data={allRegions.map((region) => ({ value: region.id, label: region.region_name }))}
            onChange={(value) => setFormData((prevData) => ({ ...prevData, region: value }))}
            placeholder="Select region"
            searchable
            withScrollArea={false}
            styles={{ dropdown: { maxHeight: 200, overflowY: 'auto' } }}
            nothingFoundMessage="No Matching Regions Found!"
          />
          <Input
            required
            type="number"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <Input
            required
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <Textarea
            name="comments"
            label="Comments"
            value={formData.comments}
            onChange={handleChange}
          />
          <Button type="submit" mt="md">Submit</Button>
        </form>
      )}
    </Modal>
  );
};

export default QuotationModal;
