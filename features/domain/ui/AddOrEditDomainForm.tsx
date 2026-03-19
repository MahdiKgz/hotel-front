import React from "react";
import AddAmenityForm from "./AddAmenityForm";
import EditAmenityForm from "./EditAmenityForm";

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
      {initialValues ? (
        <EditAmenityForm initialValues={initialValues} />
      ) : (
        <AddAmenityForm />
      )}
    </div>
  );
}

export default AddOrEditDomainForm;
