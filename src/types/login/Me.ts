export type Me = {
  usr_idt_id: number;
  per_id: number;
  usr_txt_email: string;
  usr_bol_email_verified: boolean;
  roles: string[];
  usr_sta_state: number;
  usr_sta_employee_state: number;
  usr_int_token_version: number;
  usr_dat_created_at: string;
  usr_dat_updated_at: string;
  date_deleted_at: string | null;
  person_data: {
    per_txt_first_name: string;
    per_txt_last_name: string;
    per_txt_dni: string;
    per_dat_birthdate: string;
    per_int_gender: number;
    per_txt_email: string;
    per_txt_phone: string;
    per_txt_address: string;
    per_sta_state: boolean;
    per_txt_photo?: string;
  };
  doctor_data?: {
    doc_txt_specialty: string;
    doc_txt_employee_id: string;
  };
  patient_data?: {
    pat_txt_medical_history: string;
  };
};
