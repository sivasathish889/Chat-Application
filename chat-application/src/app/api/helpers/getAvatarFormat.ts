 const getAvatarSrc = (avatar: string) => {
    if (avatar.startsWith("/uploads/")) return avatar;
    const parts = avatar.split(/[/\\]public[/\\]uploads[/\\]?/);
    if (parts.length > 1) {
      return "/uploads/" + parts[1];
    }
    return avatar;
  };


export default getAvatarSrc