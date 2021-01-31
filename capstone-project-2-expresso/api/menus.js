const express = require('express');
const menuRouter = express.Router();
const sqlite = require('sqlite3');
const menuItemsRouter = require('./menu-items');
const db = new sqlite.Database(process.env.TEST_DATABASE || './database.sqlite');

// mount menuItemRouter @ /api/menus/:menuId/menu-items
menuRouter.use('/:menuId/menu-items', menuItemsRouter);

// GET /api/menus
menuRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM Menu', (err, menus) => {
    if (err) {
      next(err);
    } else {
      res.status(200).json({ menus });
    }
  });
});

// POST /api/menus
menuRouter.post('/', (req, res, next) => {
  const { title } = req.body.menu;
  if (!title) {
    res.sendStatus(400);
  } else {
    db.run('INSERT INTO Menu (title) VALUES ($title)', { $title: title }, function (err) {
      if (err) {
        next(err);
      } else {
        db.get('SELECT * FROM Menu WHERE Menu.id = $id', { $id: this.lastID }, (err, menu) => {
          res.status(201).json({ menu });
        });
      }
    });
  }
});

// menuRouter param for menuId @ /api/menus/:menuId
menuRouter.param('menuId', (req, res, next, menuId) => {
  db.get('SELECT * FROM Menu WHERE Menu.id = $menuId', { $menuId: menuId }, (err, menu) => {
    if (err) {
      next(err);
    } else if (menu) {
      req.menu = menu;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

// GET /api/menus/:menuId
menuRouter.get('/:menuId', (req, res, next) => {
  res.status(200).json({ menu: req.menu });
});

// PUT /api/menus/:menuId
menuRouter.put('/:menuId', (req, res, next) => {
  const { title } = req.body.menu;
  if (!title) {
    res.sendStatus(400);
  } else {
    const sql = 'UPDATE Menu SET title = $title WHERE Menu.id = $menuId';
    const values = {
      $title: title,
      $menuId: req.params.menuId
    };
    db.run(sql, values, function (err) {
      if (err) {
        next(err);
      } else {
        db.get('SELECT * FROM Menu WHERE Menu.id = $menuId', { $menuId: req.params.menuId }, (err, menu) => {
          res.status(200).json({ menu });
        });
      }
    });
  }
});

// PUT /api/menus/:menuId
menuRouter.delete('/:menuId', (req, res, next) => {
  db.get(
    'SELECT * FROM MenuItem WHERE MenuItem.menu_id = $menuId',
    { $menuId: req.params.menuId },
    function (err, menuItem) {
      if (err) {
        next(err);
      } else if (menuItem) {
        res.sendStatus(400);
      } else {
        db.run('DELETE FROM Menu WHERE Menu.id = $menuId', { $menuId: req.params.menuId }, (err) => {
          if (err) {
            next(err);
          } else {
            res.sendStatus(204);
          }
        });
      }
    }
  );
});

module.exports = menuRouter;
