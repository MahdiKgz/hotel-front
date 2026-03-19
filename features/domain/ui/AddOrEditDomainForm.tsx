import React from "react";
import AddAmenityForm from "./AddAmenityForm";

export interface initialValuesType {
  title: string;
  description: string;
  isActive: boolean;
}

function AddOrEditDomainForm({
  initialValues,
}: {
  initialValues: initialValuesType | null;
}) {
  return (
    <div className="w-full">
      {initialValues ? <>edit</> : <AddAmenityForm />}
    </div>
  );
}

export default AddOrEditDomainForm;
