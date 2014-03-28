function EmailsComponent(selector, deleteIconPath) {
	
	this.emailsContainer = selector;	// A div element selector to contain the email boxes
	this.emailsArray = [];				// An array containing the email strings
	this.deleteIconPath = deleteIconPath;
	this.deleteIcon = null;
	this.onEmailAdded = null;
	this.onEmailDeleted = null;

}

EmailsComponent.prototype.getEmailsCount = function() {
	return this.emailsArray.length;
}

EmailsComponent.prototype.addEmail = function(email) {
	
	if (email == null || email == "") {
		return;
	}
	
	var self = this;
	this.emailsArray.push(email);
	
	var emailBox = $('<div>', {
		'class' : 'email-box'
	});
	
	var emailSpan = $('<span>', {
		html : email
	});
	
	emailBox.append(emailSpan);
	
	if (self.deleteIconPath != null && self.deleteIconPath != "") {
		self.deleteIcon = self.deleteIconPath;
	} else {
		self.deleteIcon = "./img/x-mark-icon-16.png";
	}
	
	var deleteIcon = $('<img></img>', {
		src : self.deleteIcon,
		alt : 'Borrar',
		title : 'Borrar',
		'class' : 'delete-icon',
		click : function(e) {
			self.deleteEmail(email);
		}
	});
	
	emailBox.append(deleteIcon);
	
	$(this.emailsContainer).append(emailBox);
	if (this.onEmailAdded != null) {
		this.onEmailAdded(email);
	}
}

EmailsComponent.prototype.getEmails = function(separatorChar) {
	var DEFAULT_SEPARATOR = ';';
	var emails = "";
	for (index in this.emailsArray) {
		if (emails != "") {
			if (separatorChar == null || separatorChar == "") {
				emails += DEFAULT_SEPARATOR;
			} else {
				emails += separatorChar;
			}
		}
		
		emails += this.emailsArray[index];
	}
	return emails;
}

EmailsComponent.prototype.deleteEmail = function(email) {
	
	var index = $.inArray(email, this.emailsArray);
	if (index != -1) {
		this.emailsArray.splice(index, 1);
		var emailElement = $('.email-box')[index]; // Return a normal HTML object, not a jQuery wrapper
		$(emailElement).remove();
	}
	
	if (this.onEmailDeleted != null) {
		this.onEmailDeleted(email);
	}
	
}