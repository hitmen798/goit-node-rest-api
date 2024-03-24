const ContactsService = require("../services/ContactsService");
const HTTPError = require("../helpers/HTTPError");
const HTTPResponse = require("../helpers/HTTPResponse");

class ContactsController {
  constructor() {
    this.service = ContactsService;
  }

  async getAllContacts(req, res) {
    const { id: owner } = res.locals.user;

    const { page = 1, limit = 5, favorite } = req.query;
    const skip = (page - 1) * limit;

    const filter = { owner };
    if (favorite) filter.favorite = favorite;

    const contacts = await this.service.getContacts(filter, skip, limit);

    if (!contacts) {
      throw HTTPError(400, "Failed to retrieve contacts");
    }

    HTTPResponse(res, 200, contacts);
  }

  async getOneContact(req, res) {
    const id = req.params.contactId;
    const contact = await this.service.getContact(id);

    if (!contact) {
      throw HTTPError(404, "Contact not found");
    }

    HTTPResponse(res, 200, contact);
  }

  async deleteContact(req, res) {
    const id = req.params.contactId;
    const contact = await this.service.deleteContact(id);

    if (!contact) {
      throw HTTPError(404, "Contact not found");
    }

    HTTPResponse(res, 200, contact, `Contact with ID ${id} deleted`);
  }

  async createContact(req, res) {
    const { id: owner } = res.locals.user;
    const contact = await this.service.createContact({ ...req.body, owner });

    if (!contact) {
      throw HTTPError(400, "Provide all required fields");
    }

    HTTPResponse(res, 201, contact);
  }

  async updateContact(req, res) {
    const { contactId } = req.params;
    const updatedContact = await this.service.updateContact(
      contactId,
      req.body
    );

    if (!updatedContact) {
      throw HTTPError(404, "Contact not found");
    }

    HTTPResponse(
      res,
      200,
      updatedContact,
      `Contact with ID ${contactId} updated`
    );
  }

  async updateStatusContact(req, res) {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (!favorite) {
      throw HTTPError(400, "Missing 'favorite' field in request body");
    }

    const updatedStatusContact = await this.service.updateStatusContact(
      contactId,
      req.body
    );

    if (!updatedStatusContact) {
      throw HTTPError(404, "Contact not found");
    }

    HTTPResponse(
      res,
      200,
      updatedStatusContact,
      `Field 'favorite' updated successfully`
    );
  }
}

module.exports = new ContactsController();
