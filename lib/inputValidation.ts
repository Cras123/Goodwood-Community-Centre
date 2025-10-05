// Input validation and sanitization utilities

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitizedValue?: string;
}

// Sanitize string input
export const sanitizeString = (input: string): string => {
  if (typeof input !== "string") return "";

  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .substring(0, 255); // Limit length
};

// Validate email format
export const validateEmail = (email: string): ValidationResult => {
  const errors: string[] = [];

  if (!email) {
    errors.push("Email is required");
    return { isValid: false, errors };
  }

  const sanitized = sanitizeString(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(sanitized)) {
    errors.push("Invalid email format");
  }

  if (sanitized.length > 254) {
    errors.push("Email is too long");
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: sanitized,
  };
};

// Validate name
export const validateName = (name: string): ValidationResult => {
  const errors: string[] = [];

  if (!name) {
    errors.push("Name is required");
    return { isValid: false, errors };
  }

  const sanitized = sanitizeString(name);

  if (sanitized.length < 2) {
    errors.push("Name must be at least 2 characters long");
  }

  if (sanitized.length > 50) {
    errors.push("Name must be less than 50 characters");
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  if (!/^[a-zA-Z\s\-']+$/.test(sanitized)) {
    errors.push(
      "Name can only contain letters, spaces, hyphens, and apostrophes"
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: sanitized,
  };
};

// Validate phone number (optional)
export const validatePhone = (phone: string): ValidationResult => {
  const errors: string[] = [];

  if (!phone) {
    return { isValid: true, errors: [], sanitizedValue: "" };
  }

  const sanitized = sanitizeString(phone);

  // Basic phone validation (allows various formats)
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

  if (!phoneRegex.test(sanitized.replace(/[\s\-\(\)]/g, ""))) {
    errors.push("Invalid phone number format");
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedValue: sanitized,
  };
};

// Validate and sanitize form data
export const validateFormData = (data: Record<string, any>) => {
  const errors: string[] = [];
  const sanitized: Record<string, any> = {};

  // Validate required fields
  const requiredFields = ["name", "email", "password"];
  for (const field of requiredFields) {
    if (!data[field]) {
      errors.push(
        `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      );
    }
  }

  // Validate name
  if (data.name) {
    const nameValidation = validateName(data.name);
    if (!nameValidation.isValid) {
      errors.push(...nameValidation.errors);
    } else {
      sanitized.name = nameValidation.sanitizedValue;
    }
  }

  // Validate email
  if (data.email) {
    const emailValidation = validateEmail(data.email);
    if (!emailValidation.isValid) {
      errors.push(...emailValidation.errors);
    } else {
      sanitized.email = emailValidation.sanitizedValue;
    }
  }

  // Validate phone (optional)
  if (data.phone) {
    const phoneValidation = validatePhone(data.phone);
    if (!phoneValidation.isValid) {
      errors.push(...phoneValidation.errors);
    } else {
      sanitized.phone = phoneValidation.sanitizedValue;
    }
  }

  // Password validation (basic - detailed validation is in passwordValidation.ts)
  if (data.password) {
    if (data.password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    }
    sanitized.password = data.password; // Don't sanitize passwords
  }

  return {
    isValid: errors.length === 0,
    errors,
    sanitizedData: sanitized,
  };
};

// XSS protection for HTML content
export const sanitizeHtml = (html: string): string => {
  if (typeof html !== "string") return "";

  return html
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};
