// components/PostActions.jsx
import React from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../utils/api";

const PostActions = ({ post, authToken, onActionComplete, navigate }) => {
  const handleRestore = async () => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/public/api/posts/${post.id}/restore`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      onActionComplete(post.id, "draft");
      toast.success("Post restored successfully.");
    } catch (error) {
      console.error("Restore failed:", error);
      toast.error("Failed to restore post.");
    }
  };

  const handlePublish = async () => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/public/api/posts/${post.id}/publish`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      onActionComplete(post.id, "published");
      toast.success("Post published successfully.");
    } catch (error) {
      console.error("Publish failed:", error);
      toast.error("Failed to publish post.");
    }
  };

  const handleUnpublish = async () => {
    try {
      await axios.patch(
        `${API_BASE_URL}/api/public/api/posts/${post.id}/unpublish`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      onActionComplete(post.id, "draft");
      toast.success("Post unpublished successfully.");
    } catch (error) {
      console.error("Unpublish failed:", error);
      toast.error("Failed to unpublish post.");
    }
  };

  const handleUpdate = (e) => {
    e.stopPropagation();
    navigate(`/update/${post.id}`);
  };

  const handleArchive = async (e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to archive this post?")) return;
    try {
      await axios.patch(
        `${API_BASE_URL}/api/public/api/posts/${post.id}/archive`,
        {},
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      onActionComplete(post.id, null); // Remove from list
      toast.success("Post archived successfully.");
    } catch (error) {
      console.error("Failed to archive post:", error);
      toast.error("Failed to archive post.");
    }
  };

  return (
    <div className="flex justify-between gap-2 items-center mt-2">
      {(post.status === "published" || post.status === "draft") && (
        <button
          onClick={handleUpdate}
          className="text-sm px-3 py-1 bg-sky-700 text-white rounded hover:bg-blue-700"
        >
          Update
        </button>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          post.status === "archived" ? handleRestore() : handleArchive(e);
        }}
        className={`text-sm px-3 py-1 ${
          post.status === "archived"
            ? "bg-green-600 hover:bg-green-700"
            : "bg-yellow-500 hover:bg-yellow-600"
        } text-white rounded`}
      >
        {post.status === "archived" ? "Restore" : "Archive"}
      </button>
      {post.status === "published" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleUnpublish();
          }}
          className="text-sm px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          UnPublish
        </button>
      )}
      {post.status === "draft" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePublish();
          }}
          className="text-sm px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Publish
        </button>
      )}
    </div>
  );
};

export default PostActions;
