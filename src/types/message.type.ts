export interface User {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  image?: string | null;
  createdAt: string;
  updatedAt: string;
}
