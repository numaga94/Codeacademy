const express = require('express');
const menuItemsRouter = express.Router({ mergeParams: true });
const sqlite = require('sqlite3');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

// GET /api/menus/:menuId/menu-items
menuItemsRouter.get('/', (req, res, next) => {
  db.all(
    'SELECT * FROM MenuItem WHERE MenuItem.menu_id = $menuId',
    { $menuId: req.params.menuId },
    (err, menuItems) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({ menuItems });
      }
    }
  );
});

// POST /api/menus/:menuId/menu-items
menuItemsRouter.post('/', (req, res, next) => {
  const { name, description, inventory, price } = req.body.menuItem;
  if (!name || !description || !inventory || !price) {
    res.sendStatus(400);
  } else {
    const sql =
      'INSERT INTO MenuItem (name, description, inventory, price, menu_id) VALUES ($name, $description, $inventory, $price, $menuId)';
    const values = {
      $name: name,
      $description: description,
      $inventory: inventory,
      $price: price,
      $menuId: req.params.menuId
    };
    db.run(sql, values, function (err) {
      if (err) {
        next(err);
      } else
        db.get('SELECT * FROM MenuItem WHERE MenuItem.id = $id', { $id: this.lastID }, (err, menuItem) => {
          res.status(201).json({ menuItem });
        });
    });
  }
});

// menuItemsRouter param for 'menuItemId' @ /api/menus/:menuId/menu-items/:menuItemId
menuItemsRouter.param('menuItemId', (req, res, next, menuItemId) => {
  db.get('SELECT * FROM MenuItem WHERE MenuItem.id = $id', { $id: menuItemId }, (err, menuItem) => {
    if (err) {
      next(err);
    } else if (menuItem) {
      req.menuItem = menuItem;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

// PUT /api/menus/:menuId/menu-items/:menuItemId
menuItemsRouter.put('/:menuItemId', (req, res, next) => {
  const { name, description, inventory, price } = req.body.menuItem;
  if (!name || !description || !inventory || !price) {
    res.sendStatus(400);
  } else {
    const sql =
      'UPDATE MenuItem SET name = $name, description = $description, inventory = $inventory, price = $price WHERE MenuItem.id = $menuItemId';
    const values = {
      $name: name,
      $description: description,
      $inventory: inventory,
      $price: price,
      $menuItemId: req.params.menuItemId
    };
    db.run(sql, values, function (err) {
      if (err) {
        next(err);
      } else {
        db.get(
          'SELECT * FROM MenuItem WHERE MenuItem.id = $menuItemId',
          { $menuItemId: req.params.menuItemId },
          (err, menuItem) => {
            res.status(200).json({ menuItem });
          }
        );
      }
    });
  }
});

// DELETE /api/menus/:menuId/menu-items/:menuItemId
menuItemsRouter.delete('/:menuItemId', (req, res, next) => {
  db.run('DELETE FROM MenuItem WHERE MenuItem.id = $menuItemId', { $menuItemId: req.params.menuItemId }, (err) => {
    if (err) {
      next(err);
    } else {
      res.sendStatus(204);
    }
  });
});

module.exports = menuItemsRouter;
