import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY
// const NEWS_API_KEY = process.env.REACT_APP_NEWS_API_KEY_2

// const NEWS_API_ENDPOINT = `https://newsapi.org/v2/everything?q=bussiness OR (crypto)&sortBy=publishedAt&language=en&apiKey=${NEWS_API_KEY}`


const initialState = {
    allArticles: [],
    currentPage: [],
    isLoading: true,
    isError:false,
    pages:0,
    currentSliceIndex:0,
    allArticlesSlices:[]
  };
  
  export const getArticles = createAsyncThunk(
    'articles/getArticles',
    async (name, thunkAPI) => {
      try {
        console.log(name);
        // console.log(thunkAPI);
        // console.log(thunkAPI.getState());
        // thunkAPI.dispatch(openModal());
        // const resp = await axios.get(NEWS_API_ENDPOINT);
        const resp = await axios.get("/articals/getArticals",{
          baseURL:process.env.REACT_APP_INTERNAL_API_PATH,
          withCredentials:true
        });

        console.log(resp)
        return resp.data.articles;
      } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('something went wrong')
      }
    }
  );
  
  const articlesSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
      resetArticles: (state) => {
        state.allArticles = [];
      },
      nextPage: (state,action)=>{
        if(state.currentSliceIndex < state.pages - 1){
          state.currentSliceIndex += 1;
          state.currentPage = state.allArticlesSlices[state.currentSliceIndex];
        }
      },
      previousPage: (state,action)=>{
        if(state.currentSliceIndex > 0){
          state.currentSliceIndex -= 1;
          state.currentPage = state.allArticlesSlices[state.currentSliceIndex];
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getArticles.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getArticles.fulfilled, (state, action) => {
          // console.log(action);
          state.isLoading = false;
          state.allArticles = action.payload;
          const itemsPerPage = 15;
          state.pages = Math.ceil(state.allArticles.length/itemsPerPage);
          state.allArticlesSlices = Array.from({length:state.pages},(item,index)=>{
            const start = index * itemsPerPage;
            return state.allArticles.slice(start, start+itemsPerPage)
          })
          console.log(state.allArticlesSlices)
          state.currentPage = state.allArticlesSlices[0];

        })
        .addCase(getArticles.rejected, (state, action) => {
          console.log(action);
          state.isError = true;
          state.isLoading = false;
        });
    },
  });
  
  export const { resetArticles, nextPage, previousPage } = articlesSlice.actions;
  
  export default articlesSlice.reducer;