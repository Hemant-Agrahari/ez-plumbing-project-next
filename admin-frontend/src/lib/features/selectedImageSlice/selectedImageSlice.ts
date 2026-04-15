import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Image {
    title: string;
    caption?: string;
    altTag?: string;
    description?: string;
    id: number;
    image: string;
}

interface SelectedImageState {
    selectedImage: Image | null;
}

const initialState: SelectedImageState = {
    selectedImage: null
};

const selectedImageSlice = createSlice({
    name: 'selectedImage',
    initialState,
    reducers: {
        setSelectedImage(state, action: PayloadAction<Image | null>) {
            state.selectedImage = action.payload;
        }
    }
});

export const { setSelectedImage } = selectedImageSlice.actions;
export default selectedImageSlice.reducer;
