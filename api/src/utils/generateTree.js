const mongoose = require('mongoose');

/**
 * Generate a tree structure from a rootPage who must contain children array with generation number for each child
 *
 * @param rootPage
 */
module.exports.generateTreeFromPage = (rootPage) => {
    const children = [];
    let currentGeneration = rootPage.children.filter(e => e.generation === 0);

    currentGeneration.forEach((child) => {
        children.push(this.getChildren(rootPage, child));
    });

    rootPage.children = children;

    return rootPage;
}

module.exports.getChildren = (rootPage, page) => {
    page.children = [];
    const children = rootPage.children.filter(e => e.parent.equals(page._id));

    if (children.length > 0) {
        page.children = children.map(child => {
            return this.getChildren(rootPage, child);
        });
    }

    return page;
}
