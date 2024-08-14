import frappe
from frappe import _


# ? USER REGISTER API
@frappe.whitelist(allow_guest=1)
def register_user(full_name, email, password, redirect_to="/app"):
    try:
        # ? CHECK IF THE USER IS ALREADY REGISTERED
        user = frappe.db.get("User", {"email": email})

        # ? IF THE USER IS REGISTERED
        if user:

            # ? IF THE USE IS ENABLED
            if user.enabled:
                return {
                    "success": False,
                    "message": f"User is already registered!: {email}",
                }

            # ? IF THE USE IS DISABLED
            else:
                return {
                    "success": False,
                    "message": f"User is disabled!: {email}",
                }

        # ? IF THE USE DOES NOT EXISTS
        else:
            user = frappe.get_doc(
                {
                    "doctype": "User",
                    "email": email,
                    "first_name": full_name,
                    "enabled": 1,
                    "new_password": password,
                    "user_type": "System User",
                }
            )
            user.flags.ignore_permissions = True
            user.flags.ignore_password_policy = True
            user.insert()

            # ! FOR NOW AS A SYSTEM MANAGER
            # ? SET DEFAULT ROLES TO THE USER
            default_role = "System Manager"
            if default_role:
                user.add_roles(default_role)

            # ? SET THE DEFAULT REDIRECT PATH AFTER LOGIN
            if redirect_to:
                frappe.cache.hset("redirect_after_login", user.name, redirect_to)

            frappe.db.commit()

    # ! IF ERROR OCURRED
    except Exception as e:
        frappe.db.rollback()
        return {
            "success": False,
            "message": f"Something went wrong!: {str(e)}",
        }

    # ? IF EVERYTHING GOES WELL
    else:
        return {
            "success": True,
            "message": f"User has been registered successfully!: {email}",
        }