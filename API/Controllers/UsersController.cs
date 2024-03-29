﻿using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class UsersController : BaseApiControllers
{ 
     
     private readonly DataContext _context;
     public UsersController(DataContext context)
     {
        _context=context;
     }
    [AllowAnonymous]
    [HttpGet]
     public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers(){

          var users=await _context.Users.ToListAsync();

          return users;
     } 
     [HttpGet("{id}")]
     public async Task<ActionResult<AppUser>> GetUser(int id)
     {
          return await _context.Users.FindAsync(id);
     }
    [HttpPut] 
    public async void update(int id,string name)
    {
      var entity=await _context.Users.FirstOrDefaultAsync(e=>e.Id==id);
      entity.UserName=name;
      await _context.SaveChangesAsync();
    }
}