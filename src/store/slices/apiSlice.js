import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Member', 'User', 'Package', 'Transaction', 'Transaction Detail'],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credential) => ({
        url: '/login',
        method: 'POST',
        body: credential
      })
    }),

    // Member CRUD
    getMembers: builder.query({
      query: () => '/member',
      providesTags: ['Member'],
    }),
    addNewMember: builder.mutation({
      query: (member) => ({
        url: '/member',
        method: 'POST',
        body: member,
      }),
      invalidatesTags: ['Member'],
    }),
    updateMember: builder.mutation({
      query: ({id, newMember}) => ({
        url: `/member/${id}`,
        method: 'PUT',
        body: newMember
      }),
      invalidatesTags: ['Member'],
    }),
    deleteMember: builder.mutation({
      query: (id) => ({
        url: `/member/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Member'],
    }),

    // Package CRUD
    getPackages: builder.query({
      query: () => '/package',
      providesTags: ['Package'],
    }),
    addNewPackage: builder.mutation({
      query: (initialPackage) => ({
        url: '/package',
        method: 'POST',
        body: initialPackage
      }),
      invalidatesTags: ['Package'],
    }),
    updatePackage: builder.mutation({
      query: ({id, newPackage}) => ({
        url: `/package/${id}`,
        method: 'PUT',
        body: newPackage
      }),
      invalidatesTags: ['Package'],
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/package/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Package'],
    }),

    // User CRUD
    getUsers: builder.query({
      query: () => '/user',
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: ({id, newUser}) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: newUser
      }),
      invalidatesTags: ['User'],
    }),
    addNewUser: builder.mutation({
      query: (user) => ({
        url: '/user',
        method: 'POST',
        body: user
      }),
      invalidatesTags: ['User'],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['User'],
    }),

    // Transaction CRUD
    getTransactions: builder.query({
      query: () => '/transaction',
      providesTags: ['Transaction'],
    }),
    addNewTransaction: builder.mutation({
      query: (transaction) => ({
        url: '/transaction',
        method: 'POST',
        body: transaction
      }),
      invalidatesTags: ['Transaction'],
    }),
    updateTransaction: builder.mutation({
      query: ({id, newTransaction}) => ({
        url: `/transaction/${id}`,
        method: 'PUT',
        body: newTransaction
      }),
      invalidatesTags: ['Transaction'],
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Transaction'],
    }),

    // Transaction Details CRUD
    getTransactionDetails: builder.query({
      query: () => '/transaction_detail',
      providesTags: ['Transaction Detail'],
    }),
    addNewTransactionDetail: builder.mutation({
      query: (transactionDetail) => ({
        url: '/transaction_detail',
        method: 'POST',
        body: transactionDetail
      }),
      invalidatesTags: ['Transaction Detail'],
    }),
    updateTransactionDetail: builder.mutation({
      query: ({id, newTransactionDetail}) => ({
        url: `/transaction_detail/${id}`,
        method: 'PUT',
        body: newTransactionDetail
      }),
      invalidatesTags: ['Transaction Detail'],
    }),
    deleteTransactionDetail: builder.mutation({
      query: (id) => ({
        url: `/transaction_detail/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Transaction Detail'],
    })
  })
});

export const {
  useLoginMutation,
  useGetMembersQuery,
  useAddNewMemberMutation,
  useUpdateMemberMutation,
  useDeleteMemberMutation,
  useGetPackagesQuery,
  useAddNewPackageMutation,
  useUpdatePackageMutation,
  useDeletePackageMutation,
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetTransactionsQuery,
  useAddNewTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
  useGetTransactionDetailsQuery,
  useAddNewTransactionDetailMutation,
  useUpdateTransactionDetailMutation,
  useDeleteTransactionDetailMutation
} = api;
