import { createApi } from "@reduxjs/toolkit/query";

export const apiSlice = createApi({
    baseQuery : fetch({baseUrl : 'http://localhost:3000/'}),
    tagTypes : ['Note', 'User'],
    endpoints : builder =>({})
})