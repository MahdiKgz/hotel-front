import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileProps {
  id: number;
  fullName: string;
  email: string | null;
  phone: string;
  address: string | null;
  avatar: string | null;
  role: string;
  bio: string | null;
}

const initialState: ProfileProps = {
  id: 0,
  fullName: "",
  email: null,
  phone: "",
  address: null,
  avatar: null,
  role: "GUEST",
  bio: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUserProfile: (state, action: PayloadAction<ProfileProps>) => {
      return action.payload;
    },
    clearUserProfile: () => initialState,
  },
});

export const { setUserProfile, clearUserProfile } = profileSlice.actions;
export default profileSlice.reducer;
