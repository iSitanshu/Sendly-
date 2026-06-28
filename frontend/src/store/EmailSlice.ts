import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AttachmentMeta {
  name: string;
  size: number;
  type: string;
}

interface EmailCredentials {
  email: string;
  credentail: string;
}

interface EmailContent {
  subject: string;
  body: string;
}

interface Recipient {
  email: string;
  [key: string]: string; // dynamic placeholdersStore
}

interface EmailState {
  emailCredentials: EmailCredentials;
  placeholdersStore: string[];
  recipientsList: Recipient[];
  emailContent: EmailContent;
  attachments: AttachmentMeta[];
}

const initialState: EmailState = {
  emailCredentials: {
    email: "",
    credentail: "",
  },

  placeholdersStore: [],

  recipientsList: [],
  emailContent: {
    subject: "",
    body: "",
  },
  attachments: [],
};

// SLICE

const EmailSlice = createSlice({
  name: "email",
  initialState,

  reducers: {
    setEmailCredentials: (state, action: PayloadAction<EmailCredentials>) => {
      state.emailCredentials = action.payload;
    },

    setPlaceholdersStore: (state, action: PayloadAction<string[]>) => {
      state.placeholdersStore = action.payload;
    },

    setAttachments: (state, action) => {
      state.attachments = action.payload;
    },

    removeAttachment: (state, action) => {
      state.attachments = state.attachments.filter(
        (_, index) => index !== action.payload,
      );
    },

    setRecipientsList: (state, action: PayloadAction<Recipient[]>) => {
      state.recipientsList = action.payload;
    },
    setEmailContent: (state, action: PayloadAction<EmailContent>) => {
      state.emailContent = action.payload;
    },

    addRecipient: (state, action: PayloadAction<Recipient>) => {
      state.recipientsList.push(action.payload);
    },

    removeRecipient: (state, action: PayloadAction<string>) => {
      state.recipientsList = state.recipientsList.filter(
        (item) => item.email !== action.payload,
      );
    },

    resetEmailState: (state) => {
      state.emailCredentials = {
        email: "",
        credentail: "",
      };

      state.placeholdersStore = [];
      state.recipientsList = [];

      state.emailContent = {
        subject: "",
        body: "",
      };
    },
  },
});

export const {
  setEmailCredentials,
  setPlaceholdersStore,
  setRecipientsList,
  addRecipient,
  removeRecipient,
  resetEmailState,
  setEmailContent,
  setAttachments,
  removeAttachment,
} = EmailSlice.actions;

export default EmailSlice.reducer;
