export interface ChatList {
  id: number;
  spaceName: string;
  spaceImage: string;
  otherName: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export type Message = {
  id: number;
  content: string;
  type: 'TEXT' | 'IMAGE' | 'VIDEO';
  senderName: string;
  senderId: number;
  createdAt: string;
  isLoginUsersMessage: boolean;
};

type Sort = {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
};

type Pageable = {
  offset: number;
  sort: Sort[];
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  unpaged: boolean;
};

export type PaginationResponse = {
  totalElements: number;
  totalPages: number;
  size: number;
  content: Message[];
  number: number;
  sort: Sort[];
  numberOfElements: number;
  pageable: Pageable;
  first: boolean;
  last: boolean;
  empty: boolean;
};
