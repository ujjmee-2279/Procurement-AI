import frappe
from frappe import _

# Send mail to vendor for quotation
@frappe.whitelist(allow_guest=1)
def send_quotation_mail(user_id, to_address, equipment_name):
    # Fetch the user's email from the User doctype using user_id
    fetch_user_email = frappe.db.get_value("User", user_id, "email")
    fetch_user_fullname = frappe.db.get_value("User", user_id, "full_name")
    
    if fetch_user_email:
        try:
            # Create the email content with the equipment name
            subject = _("Request for Quotation")
            message = _("""
Dear Vendor,

We have identified your esteemed company through the Frappe ERP system and are interested in obtaining a quotation for the following equipment: {}.

We would appreciate it if you could provide us with the details and pricing at your earliest convenience.

Thank you for your attention to this matter.

Best regards,
{}
""").format(equipment_name, fetch_user_fullname)
            
            # Send the email using Frappe's sendmail function
            frappe.sendmail(
                recipients=[to_address],
                subject=subject,
                message=message,
                now=True
            )
            
            return {"message": "Email sent successfully to {}".format(to_address)}
        
        except Exception as e:
            # Handle any exceptions that occur during email sending
            return {"error": "Failed to send email: {}".format(str(e))}
    else:
        return {"error": "User not found"}
