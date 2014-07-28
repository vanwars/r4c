var app = app || {};

var DetailUpdateView = DetailView.extend({
    events: {
        "change"        : "change",
        "click .save"   : "beforeSave"
    },

    render: function () {
        if (this.model)
			this.$el.html(this.template(this.model.toJSON()));
		else
			this.$el.html("You are not logged in");
    },

    change: function (event) {
		// Remove any existing alert message
        app.utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};
        change[target.name] = target.value;
        this.model.set(change);

        // Run validation rule (if any) on changed item
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            app.utils.addValidationError(target.id, check.message);
        } else {
            app.utils.removeValidationError(target.id);
        }
    },

    beforeSave: function () {
		var self = this;
        var check = this.model.validateAll();
        if (check.isValid === false) {
            app.utils.displayValidationErrors(check.messages);
            return false;
        }
        this.saveModel();
        return false;
    },

    saveModel: function () {
		var self = this;
        this.model.save(null, {
            success: function (model) {
                app.utils.showAlert('Success!', 'User information successfully saved', 'alert-success');
            },
            error: function () {
                app.utils.showAlert('Error', 'An error occurred while trying to update this item', 'alert-error');
            }
        });
    }

});