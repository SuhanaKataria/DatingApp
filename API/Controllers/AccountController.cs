﻿using System.Security.Cryptography;
using System.Security.Principal;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class AccountController : BaseApiControllers
{
     private readonly DataContext _context;
     private readonly iTokenService _tokenService;
     public AccountController(DataContext context,iTokenService tokenService)
     { 
        _tokenService=tokenService;
        _context = context;
     }

     [HttpPost("register")] //POST: api/account/register

public async Task<ActionResult<UserDto>> Register(RegisterDTO registerDto)
{   
    if(await UserExists(registerDto.Username)) return BadRequest("Username is taken");
    using var hmac= new HMACSHA512();
    var user =new AppUser
    {
        UserName= registerDto.Username.ToLower(),
        PasswordHash= hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
        PasswordSalt=hmac.Key
    };
    _context.Users.Add(user);
    await _context.SaveChangesAsync();
    return new UserDto{
        UserName=user.UserName,
        Token =_tokenService.CreateToken(user)
    };
} 
[HttpPost("login")]
public async Task<ActionResult<UserDto>> login(LoginDto loginDto){
   var user=await _context.Users.SingleOrDefaultAsync(x=>
   x.UserName==loginDto.UserName);
   if(user==null) return Unauthorized("invalid username");
   using var hmac=new HMACSHA512(user.PasswordSalt);
   var computedHash=hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));
   for(int i=0;i<computedHash.Length;i++)
   {
    if(computedHash[i]!=user.PasswordHash[i]) return Unauthorized("invalid password");
   }
    return new UserDto{
        UserName=user.UserName,
        Token =_tokenService.CreateToken(user)
    };
}
private async Task<bool> UserExists(string username)
{
    return await _context.Users.AnyAsync(x=>x.UserName==username.ToLower());
}
}


