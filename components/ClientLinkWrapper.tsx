"use client";

import React from "react";

interface ClientLinkWrapperProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const ClientLinkWrapper = ({
  href,
  children,
  className,
}: ClientLinkWrapperProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  );
};

export default ClientLinkWrapper;
