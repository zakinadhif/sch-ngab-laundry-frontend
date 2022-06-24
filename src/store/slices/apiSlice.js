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
      query: () => '/member'
    }),
    addNewMember: builder.mutation({
      query: (member) => ({
        url: '/member',
        method: 'POST',
        body: member
      })
    }),
    updateMember: builder.mutation({
      query: ({id, newMember}) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: newMember
      })
    }),
    deleteMember: builder.mutation({
      query: (id) => ({
        url: `/member/${id}`,
        method: 'DELETE'
      })
    }),

    // Package CRUD
    getPackages: builder.query({
      query: () => '/package'
    }),
    addNewPackage: builder.mutation({
      query: (initialPackage) => ({
        url: '/package',
        method: 'POST',
        body: initialPackage
      })
    }),
    updatePackage: builder.mutation({
      query: ({id, newPackage}) => ({
        url: `/package/${id}`,
        method: 'PUT',
        body: newPackage
      })
    }),
    deletePackage: builder.mutation({
      query: (id) => ({
        url: `/package/${id}`,
        method: 'DELETE'
      })
    }),

    // User CRUD
    getUsers: builder.query({
      query: () => '/user'
    }),
    updateUser: builder.mutation({
      query: ({id, newUser}) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: newUser
      })
    }),
    addNewUser: builder.mutation({
      query: (user) => ({
        url: '/user',
        method: 'POST',
        body: user
      })
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE'
      })
    }),

    // Transaction CRUD
    getTransactions: builder.query({
      query: () => '/transaction'
    }),
    addNewTransaction: builder.mutation({
      query: (transaction) => ({
        url: '/transaction',
        method: 'POST',
        body: transaction
      })
    }),
    updateTransaction: builder.mutation({
      query: ({id, newUser}) => ({
        url: `/transaction/${id}`,
        method: 'PUT',
        body: newUser
      })
    }),
    deleteTransaction: builder.mutation({
      query: (id) => ({
        url: `/transaction/${id}`,
        method: 'DELETE'
      })
    }),

    // Transaction Details CRUD
    getTransactionDetails: builder.query({
      query: () => '/transaction_detail'
    }),
    addNewTransactionDetail: builder.mutation({
      query: (transactionDetail) => ({
        url: '/transaction_detail',
        method: 'POST',
        body: transactionDetail
      })
    }),
    updateTransactionDetail: builder.mutation({
      query: ({id, newTransactionDetail}) => ({
        url: `/transaction_detail/${id}`,
        method: 'PUT',
        body: newTransactionDetail
      })
    }),
    deleteTransactionDetail: builder.mutation({
      query: (id) => ({
        url: `/transaction_detail/${id}`,
        method: 'DELETE'
      })
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
