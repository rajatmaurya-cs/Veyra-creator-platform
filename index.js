model Comment {
  id           String   @id @default(cuid())

  content      String

  blogId       String
  blog         Blog     @relation(fields: [blogId], references: [id], onDelete: Cascade)

  createdById  String
  createdBy    User     @relation("CommentAuthor", fields: [createdById], references: [id])

  riskLevel    RiskLevel @default(REVIEW)

  isApproved   Boolean  @default(false)

  moderatedById String?
  moderatedBy   User?   @relation("CommentModerator", fields: [moderatedById], references: [id])

  moderatedAt  DateTime?

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  @@index([blogId, isApproved, createdAt(sort: Desc)])
}






const comments = await prisma.comment.findMany({
  where: {
    blogId,
    isApproved: true,
  },
  include: {
    createdBy: {
      select: {
        fullName: true,
        avatar: true,
      },
    },
  },
  orderBy: {
    createdAt: "desc",
  },
});