import { Model } from "radiks";
import Comment from "./Comment";
export default class Dataset extends Model {
  static className = "Dataset";

  static schema = {
    title: {
      type: String,
      decrypted: true, // all users will know
    },
    description: {
      type: String,
      decrypted: true, // all users will know
    },
    fileUrl: String, // publicUrl
    basics: {
      likes: {
        type: Number,
        decrypted: true,
      },
      size: {
        type: String,
        decrypted: true,
      },
      downloads: {
        type: Number,
        decrypted: true,
      },
      comments: {
        type: Number,
        decrypted: true,
      },
    },
    createdBy: String,
    poolId: {
      type: String,
      decrypted: true,
    },
  };
  static defaults = {};

  async afterFetch() {
    this.comments = await Comment.fetchList({
      datasetId: this.id,
    });
  }
}
